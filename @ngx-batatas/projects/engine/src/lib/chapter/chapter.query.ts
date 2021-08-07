import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ChapterState } from './chapter.model';
import { ChapterStore } from './chapter.store';

@Injectable({ providedIn: 'platform' })
export class ChapterQuery extends QueryEntity<ChapterState> {
  public constructor(
    protected store: ChapterStore,
  ) { super(store); }
}
