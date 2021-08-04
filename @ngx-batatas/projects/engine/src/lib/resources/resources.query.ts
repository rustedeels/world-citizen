import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ResourceState } from './resources.model';
import { ResourcesStore } from './resources.store';

@Injectable({ providedIn: 'platform' })
export class ResourcesQuery extends QueryEntity<ResourceState> {
  public constructor (
    protected readonly store: ResourcesStore
  ) {
    super(store);
  }
}
