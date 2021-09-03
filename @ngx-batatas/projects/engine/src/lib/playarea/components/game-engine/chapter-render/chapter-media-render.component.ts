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

  <video
    class="layer--level-1"
    *ngFor="let v of videos"
    [loop]="v.loop"
    autoplay
  ><source [src]="v.path" /></video>

  <ng-container *ngFor="let i of imgs">
    <img
      class="layer--level-1"
      *ngIf="i"
      [src]="i"
      [alt]="i"
    />
  </ng-container>

</div>
`
})
export class ChapterMediaRenderComponent implements OnInit {
  public backgroundPath?: string;

  public videos: {
    path: string;
    loop: boolean;
  }[] = [];

  public imgs: string[] = [];

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
    this.udpateVideos(map);
    this.updateImages(map);
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

  private udpateVideos(map: MediaMap) {
    const files = getMedia('video', map);
    const videos = this.videos.filter(
      e => files.find(v => v.path === e.path));

    for (const v of files)
      if (!videos.find(e => e.path === v.path))
        videos.push({
          path: v.path,
          loop: !v.attr.find(a => a === 'END'),
        })

    this.videos = videos;
  }

  private updateImages(map: MediaMap) {
    const files = getMedia('image', map);
    const imgs = this.imgs.filter(
      e => files.find(v => v.path === e));

    for (const v of files)
      if (!imgs.find(e => e === v.path))
        imgs.push(v.path);

    this.imgs = imgs;
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
