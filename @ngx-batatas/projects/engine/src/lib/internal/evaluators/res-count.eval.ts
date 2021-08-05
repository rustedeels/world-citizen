import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { EvaluatorStoreService } from '../../evaluator';
import { BaseEvaluator } from '../../evaluator/base-evaluator';
import { ResourcesQuery } from '../../resources';

@Injectable()
export class ResourceCountEval extends BaseEvaluator<number> {
  private lastCount = 0;

  public constructor(
    store: EvaluatorStoreService,
    private readonly query: ResourcesQuery,
  ) { super(store, 'resCount') }

  public async sync(): Promise<unknown> {
    await this.sync$().toPromise();
    return;
  }

  public sync$(): Observable<unknown> {
    return this.query.selectCount()
      .pipe(
        take(1),
        map(e => this.lastCount = e)
      );
  }

  public apply(): number {
    return this.lastCount;
  }
}
