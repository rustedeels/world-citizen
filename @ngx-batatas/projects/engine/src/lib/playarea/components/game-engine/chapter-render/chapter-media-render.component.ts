import {
  Component,
  OnInit,
} from '@angular/core';

import {
  AudioService,
  AudioTrack,
} from '../../../../audio/_index';
import {
  MediaMap,
  MediaResource,
  RenderQuery,
} from '../../../../render/_index';
import { ResourceType } from '../../../../resources';

@Component({
  selector: 'bt-chapter-media-render',
  template: `
<div class="bt-chapter-media-render layer__container">
  <img
    *ngIf="backgroundPath"
    class="layer--back"
    alt="background"
    [src]="backgroundPath"
  />
</div>
`
})
export class ChapterMediaRenderComponent implements OnInit {
  public backgroundPath?: string;

  public constructor(
    private readonly _render: RenderQuery,
    private readonly _audio: AudioService,
  ) {}

  public ngOnInit() {
    this._render.select(e => e.chapter.media)
      .subscribe(map => this.update(map))
  }

  private update(map: MediaMap) {
    if (
      !map.chapter.length
      && !map.dialog.length
      && !map.text.length
    ) return;
    this.updateBack(map);
    this.updateSounds(map);
  }

  private updateBack(map: MediaMap) {
    const path = getFirstMedia('background', map)?.path;
    if (path !== this.backgroundPath)
      this.backgroundPath = path;
  }

  private updateSounds(map: MediaMap) {
    const files = getMedia('sound', map);
    files.push(...getMedia('music', map));
    const tracks: AudioTrack[] = [];

    for (const m of files) {
      tracks.push(this._audio.play(m.path, m.type, m.attr));
    }

    const toStop: AudioTrack[] = ['music', 'ambient', 'effect', 'system']
      .filter(a => !tracks.find(e => e === a)) as AudioTrack[];
    this._audio.stop(...toStop);
  }
}

const MAP_ORDER: (keyof MediaMap)[] = ['text', 'dialog', 'chapter'];

function getMedia(type: ResourceType, map: MediaMap): MediaResource[] {
  const mediaRes: MediaResource[] = [];

  for (const k of MAP_ORDER)
    for (const m of map[k])
      if (m.type === type)
        mediaRes.push(m);

  return mediaRes;
}

function getFirstMedia(type: ResourceType, map: MediaMap): MediaResource | undefined {
  for (const k of MAP_ORDER)
    for (const m of map[k])
      if (m.type === type)
        return m;

  return;
}
