import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { BodyState } from './body.model';
import { BodyStore } from './body.store';

@Injectable({ providedIn: 'platform' })
export class BodyQuery extends QueryEntity<BodyState> {

  public constructor (
    protected readonly store: BodyStore,
  ) { super(store); }

}
