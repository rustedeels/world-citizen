import {
  Component,
  OnInit,
} from '@angular/core';

import {
  AUTO_NEXT_CHAPTER,
  NextChapter,
} from '../../../../chapter/chapter.model';
import { RenderQuery } from '../../../../render/_index';
import { NavigationService } from '../../../../system/navigation.service';

@Component({
  selector: 'bt-chapter-next-render',
  template: `
<div class="bt-chapter-next-render layer__container">
  <div class="next__container layer--level-2" *ngIf="hasRender">
    <div
      class="next"
      *ngFor="let n of nextRender"
      (click)="goToChapter(n.id)"
    ><div class="text">{{n.text}}</div></div>
  </div>
</div>
`
})
export class ChapterNextRenderComponent implements OnInit{
  public nextRender: NextChapter[] = [];

  public get hasRender() {
    return this.nextRender.length > 0;
  }

  public constructor(
    private readonly _render: RenderQuery,
    private readonly _nav: NavigationService,
  ) {}

  public ngOnInit() {
    this._render.select(e => e.chapter.nextChapter)
      .subscribe(list => this.updateNext(list));
  }

  public goToChapter(id: string) {
    if (!id) return;
    this._nav.goToChapter(id);
  }

  private updateNext(list: NextChapter[]) {
    this.nextRender = [];

    if (this.hasAuto(list)) return;

    this.nextRender = [...list];
  }

  private hasAuto(list: NextChapter[]): boolean {
    if (list.length !== 1) return false;
    const n = list[0];
    if (!n || n.text !== AUTO_NEXT_CHAPTER) return false;
    this._nav.goToChapter(n.id);
    return true;
  }

}
