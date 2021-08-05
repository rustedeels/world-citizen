import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BaseEvaluator, EvaluatorStoreService, ResourcesQuery } from '@ngx-batatas/engine';

@Injectable()
export class ResourceCountEval2 extends BaseEvaluator<number> {
  private lastCount = 0;

  public constructor(
    store: EvaluatorStoreService,
    private readonly query: ResourcesQuery,
  ) { super(store, 'resCount2') }

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
