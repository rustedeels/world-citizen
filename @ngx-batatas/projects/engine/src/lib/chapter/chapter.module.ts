import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';

import {
  ChapterLoader,
  CHAPTERS_TO_LOAD,
} from './chapter.loader';
import { ChaptersGenerator } from './chapter.model';

@NgModule()
export class ChapterModule {
  public static forChapter(chapters: ChaptersGenerator[]): ModuleWithProviders<ChapterModule> {
    return {
      ngModule: ChapterModule,
      providers: [{
        provide: CHAPTERS_TO_LOAD,
        useValue: chapters,
        multi: true,
      }]
    }
  }

  public static forRoot(): ModuleWithProviders<ChapterModule> {
    return {
      ngModule: ChapterModule,
      providers: [{
        provide: APP_INITIALIZER,
        useFactory: loadChapters,
        deps: [ChapterLoader, [CHAPTERS_TO_LOAD, new Optional()]],
        multi: true,
      }]
    }
  }
}

function loadChapters(loader: ChapterLoader, chapters?: ChaptersGenerator[][]) {
  return () => {
    if (!chapters || !chapters.length) return;
    loader.addUnique(...chapters.flatMap(e => e));
  }
}
