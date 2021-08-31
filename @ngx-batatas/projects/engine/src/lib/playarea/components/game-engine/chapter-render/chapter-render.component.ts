import {
  Component,
  OnInit,
} from '@angular/core';

import { ChapterQuery } from '../../../../chapter/chapter.query';
import { LoggerService } from '../../../../logger/logger.service';
import { ChapterRenderService } from '../../../../render/chapter-render.service';
import { ChapterRender } from '../../../../render/render.model';
import { RenderQuery } from '../../../../render/render.query';

@Component({
  selector: 'bt-chapter-render',
  template: `
<div class="bt-chapter-render full-screen">
  {{ render?.id }}
</div>
`
})
export class ChapterRenderComponent implements OnInit {
  private _chapterId?: string;

  public render?: ChapterRender;

  public constructor(
    private readonly _chapterQuery: ChapterQuery,
    private readonly _chapterRender: ChapterRenderService,
    private readonly _render: RenderQuery,
    private readonly _logger: LoggerService,
  ) {}

  public ngOnInit(): void {
    this._chapterQuery.selectActive().subscribe(c => {
      const id = c?.id;

      if (!id) {
        this._logger.warning('No active chapter was found');
        this._chapterId = id;
        return;
      }

      if (this._chapterId === id) return;
      this._chapterId = id;

      this._chapterRender.renderChapter(id);
    })

    this._render.selectChapter().subscribe(c => {
      this.render = c;
      this._logger.warning('render', c);
    });
  }
}
