import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { CharAttributeState, CharAttributeStoreName, CoreAttr } from './attr.model';

@StoreConfig({ name: CharAttributeStoreName })
@Injectable({ providedIn: 'platform' })
export class CharAttributesStore<T extends CoreAttr> extends EntityStore<CharAttributeState<T>> {

  public constructor() { super() }

  /** Update experience for an attribute */
  public addExperience(id: string, type: T, amount: number): void {
    this.update(id, s => ({
      ...s,
      attr: {
        ...s.attr,
        [type]: {
          ...s.attr[type],
          exp: s.attr[type].exp + amount,
        }
      }
    }))
  }
}
