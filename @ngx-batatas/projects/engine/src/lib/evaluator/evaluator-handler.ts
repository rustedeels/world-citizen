import { forkJoin, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoggerService } from '../logger';
import { EvalMap } from './evaluator.model';

export class EvalHandler {
  public constructor(
    public readonly Expression: string,
    public readonly Evals: EvalMap,
    private readonly _logger: LoggerService,
  ) {}

  public syncEvaluators$(): Observable<unknown[]> {
    const obs =  Object.values(this.Evals).map(e => {
      return e.sync$();
    });

    return forkJoin(obs)
      .pipe(catchError(err => {
        this._logger.error('Error sync eval', err);
        return []
      }));
  }

  public async syncEvaluators(): Promise<void> {
    try {
      await Promise.all(Object.values(this.Evals).map(e => e.sync()))
    } catch (err) {
      this._logger.error('Error sync eval', err)
    }
  }

  public run(): unknown {
    try {
      const fn = eval(this.buildExp());

      if (typeof fn !== 'function')
        throw new Error('Expression did not evaluate to function');

      return fn(this.Evals);
    } catch(err) {
      this._logger.error('Error evaluating expression', err);
      return undefined;
    }
  }

  public run$(): Observable<unknown> {
    return this.syncEvaluators$()
      .pipe(map(() => this.run()));
  }

  public async runAsync(): Promise<unknown> {
    await this.syncEvaluators();
    return this.run();
  }

  private buildExp(): string {
    let exp = this.Expression;

    for (const token of Object.keys(this.Evals))
      exp = exp.replaceAll('#' + token, `map['${token}'].apply`);

    return `(map) => ${exp}`;
  }
}
