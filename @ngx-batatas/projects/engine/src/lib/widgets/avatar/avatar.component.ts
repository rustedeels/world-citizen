import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import {
  BodyQuery,
  CharBody,
} from '../../body';
import {
  BodyPartId,
  BodyPartService,
} from '../../body-part';
import { PLAYER_ID } from '../../char';

@Component({
  selector: 'bt-avatar',
  template: `
<div class="bt-avatar">
  <img
    *ngFor="let r of bodyParts"
    [alt]="r[0]"
    [ngStyle]="{ 'z-index': r[1] }"
    [src]="r[0]"
  />
</div>
`
})
export class AvatarComponent implements OnInit {
  public bodyParts: [string, number][] = [];

  @Input()
  public basePath = '/assets/player';

  public constructor(
    private readonly _bodyQuery: BodyQuery,
    private readonly _bodyPart: BodyPartService<BodyPartId>,
  ) {}

  public ngOnInit(): void {
    this._bodyQuery.selectEntity(PLAYER_ID)
      .subscribe(body => this.updateBody(body))
  }

  private updateBody(charBody?: CharBody): void {
    if (!charBody) return;

    const body = charBody.parts['body'];
    const folder = body.name.indexOf('Female') !== -1 ? 'female' : 'male';

    const parts: [string, number][] = [];
    for (const p of Object.values(charBody.parts)) {
      const path = this._bodyPart.getPathName(p.id as any);
      if (path) parts.push([this.buildPath(path[0], folder), path[1]]);
    }
    this.bodyParts = parts;
  }

  private buildPath(name: string, folder: string): string {
    return `${this.basePath}/${folder}/${name}`;
  }
}
