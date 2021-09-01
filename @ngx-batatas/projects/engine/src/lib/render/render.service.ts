import { Injectable } from '@angular/core';

import {
  ServiceInit,
  ServiceReset,
} from '../shared/service.model';
import { InitService } from '../system/init.service';
import { ResetService } from '../system/reset.service';
import { ChapterRenderService } from './chapter-render.service';

@Injectable({ providedIn: 'platform' })
export class RenderService implements ServiceInit, ServiceReset {

  public get chapter() { return this._chapterRender; }

  public constructor(
    private readonly _chapterRender: ChapterRenderService,
    init: InitService,
    reset: ResetService,
  ) {
    init.register(this);
    reset.register(this);
  }

  public async init(): Promise<void> {
    await this._chapterRender.init();
  }

  public async reset(): Promise<void> {
    await this._chapterRender.reset();
  }

}
