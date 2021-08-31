import { Injectable } from '@angular/core';

import { LoggerService } from '../logger/logger.service';
import { EvaluatorService } from './evaluator.service';

@Injectable({ providedIn: 'platform' })
export class BoolEvaluatorService {
  public constructor(
    private readonly _logger: LoggerService,
    private readonly _evalService: EvaluatorService,
  ) {}

  public async filterValues<T extends { bool: string }>(values: T[]): Promise<T[]> {
    if (!values.length) return [];
    const res: T[] = [];

    for (const v of values) {
      if (!v.bool) {
        res.push(v);
        continue;
      }

      try {
        const valid = await this._evalService.evaluateAsync(v.bool);

        if (typeof valid !== 'boolean') {
          this._logger.warning('Bool expression returned a non boolean value', v);
        }

        if (valid) { res.push(v); }
      } catch (err) {
        this._logger.error('Error evaluating bool expression', v, err);
      }
    }

    return res;
  }
}
