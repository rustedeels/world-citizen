import { Injectable } from '@angular/core';
import {
  Chapter,
  ChaptersGenerator,
} from '@ngx-batatas/core';
import { parseChapters } from '@ngx-batatas/parser';
import { readTextFile } from '@tauri-apps/api/fs';

import { BaseEntityGenerator } from '../data-loader/base-entity-loader';
import { LoaderService } from '../data-loader/loader.service';
import { LoggerService } from '../logger/logger.service';
import { OSPathMapService } from '../system/path-map.service';
import { mapRawChapters } from './chapter.mapper';
import { ChapterStoreName } from './chapter.model';
import { ChapterStore } from './chapter.store';

@Injectable({ providedIn: 'platform' })
export class ChapterLoaders extends BaseEntityGenerator<Chapter, ChaptersGenerator> {

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

    for (const path of item.chapters) {
      const filePath = this._pathMap.resolveCurrentDir(path);
      const content = await readTextFile(filePath);
      res.push(...this.parse(content, item));
    }

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
