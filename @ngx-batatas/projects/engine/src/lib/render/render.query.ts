import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { RenderState } from './render.model';
import { RenderStore } from './render.store';

@Injectable({ providedIn: 'platform' })
export class RenderQuery extends Query<RenderState> {
  public constructor(protected readonly store: RenderStore) {
    super(store);
  }

  public selectChapter() {
    return this.select(s => s.chapter);
  }

  public selectState() {
    return this.select(s => s.state);
  }
}
