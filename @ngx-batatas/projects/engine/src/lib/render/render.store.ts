import { Injectable } from '@angular/core';
import {
  Store,
  StoreConfig,
} from '@datorama/akita';

import {
  ChapterRender,
  createInitialState,
  MediaMap,
  RenderState,
  RenderStoreName,
} from './render.model';

@StoreConfig({ name: RenderStoreName })
@Injectable({ providedIn: 'platform' })
export class RenderStore extends Store<RenderState> {
  public constructor() { super(createInitialState()); }

  public updateChapter(chapter: Partial<ChapterRender>): void {
    this.update(s => ({
      ...s,
      chapter: {
        ...s.chapter,
        ...chapter
      }
    }));
  }

  public updateChapterMedia(map: Partial<MediaMap>): void {
    this.update(s => ({
      ...s,
      chapter: {
        ...s.chapter,
        media: {
          ...s.chapter.media,
          ...map,
        }
      }
    }))
  }

  public goToChapter(chapter: ChapterRender): void {
    this.update(s => ({
      ...s,
      state: 'chapter',
      chapter,
    }))
  }
}
