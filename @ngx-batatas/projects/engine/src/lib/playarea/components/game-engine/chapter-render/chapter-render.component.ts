import {
  Component,
  OnInit,
} from '@angular/core';

import { RenderQuery } from '../../../../render/_index';

@Component({
  selector: 'bt-chapter-render',
  template: `
<div class="bt-chapter-render layer__container">
  <bt-chapter-media-render class="layer--level-0" ></bt-chapter-media-render>
  <bt-chapter-dialog-render *ngIf="showDialog" class="layer--level-1" ></bt-chapter-dialog-render>
  <bt-chapter-next-render *ngIf="showNext" class="layer--level-2" ></bt-chapter-next-render>
</div>
`
})
export class ChapterRenderComponent implements OnInit {
  private timeout = false;
  private dialogEnd = false;

  public get showDialog() { return !this.dialogEnd }
  public get showNext() { return this.timeout && this.dialogEnd }

  public constructor(
    private readonly _renderQuery: RenderQuery
  ) {}

  public ngOnInit(): void {
    this._renderQuery.select(e => e.chapter.dialogEnd)
      .subscribe(end => this.dialogEnd = end);
    this._renderQuery.select(e => e.chapter.timeout)
      .subscribe(end => this.timeout = end);
  }
}
