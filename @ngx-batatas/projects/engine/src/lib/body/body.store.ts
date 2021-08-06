import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { BodySlot } from '../body-part';
import { BodyState, BodyStoreName } from './body.model';

@StoreConfig({ name: BodyStoreName })
@Injectable({ providedIn: 'platform' })
export class BodyStore extends EntityStore<BodyState> {

  /** Add experience to body part */
  public addExperience(id: string, slot: BodySlot, amount: number): void {
    this.update(id, s => ({
      ...s,
      parts: {
        ...s.parts,
        [slot]: {
          ...s.parts[slot],
          exp: s.parts[slot].exp + amount,
        }
      }
    }))
  }

}
