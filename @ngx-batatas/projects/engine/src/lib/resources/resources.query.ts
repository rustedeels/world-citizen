import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { Resource, ResourceState } from './resources.model';
import { ResourcesStore } from './resources.store';

@Injectable({ providedIn: 'platform' })
export class ResourcesQuery extends QueryEntity<ResourceState> {
  public constructor (
    protected readonly store: ResourcesStore
  ) {
    super(store);
  }

  public selectPath$(id: string): Observable<string> {
    return this.selectEntity$(id)
      .pipe(map(e => e?.path));
  }

  public selectEntity$(id: string): Observable<Resource> {
    return this.selectEntity(id)
      .pipe(filter(e => !!e))as Observable<Resource>;
  }

}
