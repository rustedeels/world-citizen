import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { FixationState, FixationStoreName } from './fixation.model';

@StoreConfig({ name: FixationStoreName })
@Injectable({ providedIn: 'platform' })
export class FixationStore extends EntityStore<FixationState> {
  public constructor () { super() }

  public addLevel(id: string, amount: number): void {
    this.update(id, s => ({
      ...s,
      level: s.level + amount
    }));
  }
}
