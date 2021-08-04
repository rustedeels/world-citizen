import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { ResourceState, ResourceStoreName } from './resources.model';

@StoreConfig({ name: ResourceStoreName })
@Injectable({ providedIn: 'platform' })
export class ResourcesStore extends EntityStore<ResourceState> {
  public constructor() {
    super();
  }
}
