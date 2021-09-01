import {
  Component,
  OnInit,
} from '@angular/core';

import {
  ChapterRenderService,
  RenderQuery,
} from '../../../../render/_index';

@Component({
  selector: 'bt-chapter-dialog-render',
  template: `
<div class="bt-chapter-dialog-render layer__container">
  <div class="dialog__container" *ngIf="text">
    <div
      class="dialog--text"
      (click)="onClickNext()"
    ><p>{{text}}</p></div>
    <div class="dialog--name">{{name}}</div>
    <div class="dialog--portrait">
      <img
        *ngIf="portraitPath"
        alt="Portrait image"
        [src]="portraitPath"
      />
    </div>
  </div>
</div>
`
})
export class ChapterDialogRenderComponent implements OnInit {
  public text = '';
  public name = '';
  public portraitPath?: string;

  public constructor(
    private readonly _render: RenderQuery,
    private readonly _renderService: ChapterRenderService,
  ) {}

  public ngOnInit(): void {
    this._render.select(state => state.chapter.dialogText)
      .subscribe(text => this.text = text ?? '');
    this._render.select(state => state.chapter.charName)
      .subscribe(text => this.name = text ?? '');
    this._render.select(state => state.chapter.charPortaitPath)
      .subscribe(path => this.portraitPath = path);
  }

  public onClickNext(): void {
    this._renderService.goNext();
  }
}
