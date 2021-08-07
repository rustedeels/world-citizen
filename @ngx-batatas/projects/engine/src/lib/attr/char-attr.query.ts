import { QueryEntity } from '@datorama/akita';

import { CharAttributeState, CoreAttr } from './attr.model';
import { CharAttributesStore } from './char-attr.store';

export class CharAttributesQuery<T extends CoreAttr> extends QueryEntity<CharAttributeState<T>> {
  public constructor(
    protected store: CharAttributesStore<T>,
  ) { super(store) }
}
