import { Injectable } from '@angular/core';

import { LoggerService } from '../logger';
import { StateEval } from './evaluator.model';

@Injectable({ providedIn: 'platform' })
export class EvaluatorStoreService {
  private readonly _evals = new Map<string, StateEval<any>>();

  public constructor(
    private readonly _logger: LoggerService
  ) {}

  public register<T>(name: string, $eval: StateEval<T>): void {
    if (this._evals.has(name)) {
      this._logger.error('Already exists an evaluator for: ', name);
      return;
    }
    this._evals.set(name, $eval);
  }

  public get<T>(name: string): StateEval<T> | undefined {
    if (this._evals.has(name)) return this._evals.get(name);
    return;
  }
}
