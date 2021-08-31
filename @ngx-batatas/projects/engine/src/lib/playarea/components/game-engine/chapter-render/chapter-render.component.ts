import {
  Component,
  OnInit,
} from '@angular/core';

import { ChapterRenderService } from '../../../../render/chapter-render.service';
import { ChapterRender } from '../../../../render/render.model';
import { RenderQuery } from '../../../../render/render.query';

@Component({
  selector: 'bt-chapter-render',
  template: `
<div class="bt-chapter-render full-screen">
  {{ render?.dialogText }}
</div>
`
})
export class ChapterRenderComponent implements OnInit {
  public render?: ChapterRender;

  public constructor(
    private readonly _chapterRender: ChapterRenderService,
    private readonly _render: RenderQuery,
  ) {}

  public ngOnInit(): void {
    this._render.selectChapter().subscribe(c => {
      this.render = c;
    });

  }
}
