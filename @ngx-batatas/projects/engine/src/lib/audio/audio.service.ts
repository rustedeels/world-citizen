import { Injectable } from '@angular/core';

import { LoggerService } from '../logger';
import { MediaResource } from '../render/render.model';
import { ServiceInit } from '../shared/service.model';
import {
  AppSettings,
  InitService,
  SettingsService,
} from '../system';
import { BoolState } from '../tools/bool.tools';
import { AudioHandler } from './audio-handler';
import {
  AudioTrackType,
  buildAudioItem,
} from './audio.model';

@Injectable({ providedIn: 'platform' })
export class AudioService implements ServiceInit {
  private _musicVolume = 1;
  private _audioVolume = 1;
  private readonly _init = new BoolState();
  private readonly _handler: { [key in AudioTrackType]: AudioHandler };

  public constructor(
    initService: InitService,
    private readonly _settings: SettingsService,
    private readonly _logger: LoggerService,
  ) {
    initService.register(this);
    this._handler = {
      ambient: new AudioHandler('ambient'),
      system: new AudioHandler('system'),
      effect: new AudioHandler('effect'),
      music: new AudioHandler('music'),
    }
  }

  public async init(): Promise<void> {
    if (!this._init.triggerOn()) return;
    this._settings.settings.subscribe(s => this.calculateVolume(s));
  }

  public play(media: MediaResource): AudioTrackType {
    const { path, track } = buildAudioItem(media);
    this._handler[track].play(path);
    return track;
  }

  public stop(...tracks: AudioTrackType[]): void {
    for (const key of tracks)
      this._handler[key].stop();
  }

  public forceStop() {
    for (const v of Object.values(this._handler))
      v.stop(true);
  }

  private calculateVolume(s?: AppSettings): void {
    if (!s) return;

    const { masterVolume, musicVolume, soundVolume } = s;
    this._musicVolume = (masterVolume / 100) * (musicVolume / 100);
    this._audioVolume = (masterVolume / 100) * (soundVolume / 100);
    this._logger.engine('Music volume set to', this._musicVolume);
    this._logger.engine('Audio volume set to', this._audioVolume);
    this.updateVolumes();
  }

  private updateVolumes(): void {

  }

}
