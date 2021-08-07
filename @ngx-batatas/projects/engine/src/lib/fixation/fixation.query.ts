import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { FixationState } from './fixation.model';
import { FixationStore } from './fixation.store';

@Injectable({ providedIn: 'platform' })
export class FixationQuery extends QueryEntity<FixationState> {
  public constructor(
    protected store: FixationStore,
  ) { super(store) }
}
