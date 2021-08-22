import {
  Injectable,
  InjectionToken,
} from '@angular/core';
import { readTextFile } from '@tauri-apps/api/fs';

import { BaseEntityGenerator } from '../data-loader/base-entity-loader';
import { LoaderService } from '../data-loader/loader.service';
import { LoggerService } from '../logger/logger.service';
import { OSPathMapService } from '../system/path-map.service';
import { mapRawChapters } from './chapter.mapper';
import {
  Chapter,
  ChaptersGenerator,
  ChapterStoreName,
} from './chapter.model';
import { ChapterStore } from './chapter.store';
import { parseChapters } from './parser/_index';

export const CHAPTERS_TO_LOAD = new InjectionToken<ChaptersGenerator[][]>('CHAPTERS_TO_LOAD');

@Injectable({ providedIn: 'platform' })
export class ChapterLoader extends BaseEntityGenerator<Chapter, ChaptersGenerator> {

  public constructor(
    logger: LoggerService,
    store: ChapterStore,
    loader: LoaderService,
    private readonly _pathMap: OSPathMapService,
  ) {
    super(logger, store);
    loader.addLoader(ChapterStoreName, this);
    _pathMap.refresh();
  }

  protected async generate(item: ChaptersGenerator): Promise<Chapter[]> {
    const res: Chapter[] = [];

    for (let path of item.chapters) {
      const content = await readTextFile('../src' + path);
      res.push(...this.parse(content, item));
    }

    this._logger.engine('Loaded chapters:', res);

    return res;
  }

  protected parse(
    content: string,
    src: ChaptersGenerator,
  ): Chapter[] {
    return mapRawChapters(
      parseChapters([content]),
      src.charMap,
      src.resMap,
      this._logger,
    )
  }
}
