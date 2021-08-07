import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { ChapterState, ChapterStoreName } from './chapter.model';

@StoreConfig({ name: ChapterStoreName })
@Injectable({ providedIn: 'platform' })
export class ChapterStore extends EntityStore<ChapterState> {
  public constructor() { super() }
}
