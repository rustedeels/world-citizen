import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { LoggerService } from '../logger';
import { EvalHandler } from './evaluator-handler';
import { EvaluatorStoreService } from './evaluator-store.service';
import { EvalMap } from './evaluator.model';

@Injectable({ providedIn: 'platform' })
export class EvaluatorService {

  public constructor (
    private readonly _store: EvaluatorStoreService,
    private readonly _logger: LoggerService,
  ) {}

  /** Evaluate expressions in format: #name(params) */
  public evaluate(expression: string): unknown {
    const handler = this.loadHandler(expression);
    return handler.run();
  }

  /** Evaluate expressions in format: #name(params) */
  public evaluate$(expression: string): Observable<unknown> {
    const handler = this.loadHandler(expression);
    return handler.run$();
  }

  /** Evaluate expressions in format: #name(params) */
  public evaluateAsync(expression: string): Promise<unknown> {
    const handler = this.loadHandler(expression);
    return handler.runAsync();
  }

  public loadHandler(expression: string): EvalHandler {
    const map = this.getEvals(expression);
    return new EvalHandler(expression, map, this._logger);
  }

  private getEvals(exp: string): EvalMap {
    const evals: EvalMap = {}

    const tokens = this.getTokens(exp);
    for(const t of tokens) {
      const ev = this._store.get<any>(t);

      if (!ev) {
        this._logger.warning("Can't find evaluator for: ", t);
        continue;
      }

      evals[t] = ev;
    }

    return evals;
  }

  private getTokens(exp: string): string[] {
    const res: string[] = [];
    const regex = /#([\w\-_]+)\(/g;
    const matches = exp.matchAll(regex);

    for(const m of matches) {
      const token = m.filter(e => e.indexOf('#'))[0];
      if (!token || res.indexOf(token) !== -1) continue;
      res.push(token)
    }

    return res;
  }

}
