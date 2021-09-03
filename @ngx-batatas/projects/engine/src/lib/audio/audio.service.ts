import { Howl } from 'howler';

import { Injectable } from '@angular/core';

import { LoggerService } from '../logger';
import { ResourceType } from '../resources';
import { ServiceInit } from '../shared/service.model';
import {
  AppSettings,
  InitService,
  SettingsService,
} from '../system';
import { BoolState } from '../tools/bool.tools';
import {
  AudioFile,
  AudioInstance,
  AudioTrack,
  AutioTrackMap,
  buildAudioFile,
} from './audio.model';

@Injectable({ providedIn: 'platform' })
export class AudioService implements ServiceInit {
  private _musicVolume = 1;
  private _audioVolume = 1;
  private  readonly _tracks: AutioTrackMap;
  private readonly _init = new BoolState();

  public constructor(
    initService: InitService,
    private readonly _settings: SettingsService,
    private readonly _logger: LoggerService,
  ) {
    initService.register(this);
    this._tracks = {
      music: this.initTrack('music'),
      ambient: this.initTrack('ambient'),
      effect: this.initTrack('effect'),
      system: this.initTrack('system'),
    }
  }

  public async init(): Promise<void> {
    if (!this._init.triggerOn()) return;
    this._settings.settings.subscribe(s => this.calculateVolume(s));
  }

  public play(path: string, type?: ResourceType, props?: string[]): AudioTrack {
    const audio = buildAudioFile(path, type, props);
    this.playFile(audio);
    return audio.track;
  }

  public playFile({ path, track }: AudioFile): void {
    const i = this._tracks[track];
    if (path === i.path) return;
    this.stop(track);
    i.howl = this.initHowl(track, path);
    i.path = path;
    i.id = path ? i.howl?.play() : undefined;
    this._tracks[track] = i;
    if (i.id) {
      this._logger.engine(`Playing ${track} track`, path, i.id);
    }
  }

  public stop(): void
  public stop(...trackList: AudioTrack[]): void
  public stop(...trackList: AudioTrack[]): void {
    if (!trackList.length) trackList = Object.keys(this._tracks) as AudioTrack[];
    for (const track of trackList) {
      const i = this._tracks[track];
      if (this.isPlaying(track)){
        i.howl?.stop(i.id);
        i.playing = false;
        this._tracks[track] = i;
        this._logger.engine('Stop audio', i.path);
      }
    }
  }

  public setVolume(track: AudioTrack, volume: number): void {
    const i = this._tracks[track];
    if (typeof i.id !== 'undefined')
      i.howl?.volume(volume, i.id)
  }

  private isPlaying(track: AudioTrack): boolean {
    return this._tracks[track].playing;
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
    this.setVolume('ambient', this._audioVolume);
    this.setVolume('effect', this._audioVolume);
    this.setVolume('system', this._audioVolume);
    this.setVolume('music', this._musicVolume);
  }

  private initTrack(track: AudioTrack): AudioInstance {
    return {
      howl: this.initHowl(track),
      track,
      playing: false,
    }
  }

  private initHowl(track: AudioTrack, path?: string): Howl | undefined {
    if (!path) return;
    return new Howl({
      autoplay: false,
      loop: track === 'ambient' || track === 'music',
      volume: track === 'music' ? this._musicVolume : this._audioVolume,
      src: path,
      onend: () => this._tracks[track].playing = false,
      onplay: () => this._tracks[track].playing = true,
    });
  }

}
