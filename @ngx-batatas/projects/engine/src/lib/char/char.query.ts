import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { CharState } from './char.model';
import { CharStore } from './char.store';

@Injectable({ providedIn: 'platform' })
export class CharQuery extends QueryEntity<CharState> {
  public constructor(
    protected readonly store: CharStore,
  ) { super(store); }
}
