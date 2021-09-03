import { AudioTrack } from './audio-track';
import {
  AUDIO_MAP,
  AudioTrackProp,
  AudioTrackType,
} from './audio.model';

export class AudioHandler {
  private readonly _prop: AudioTrackProp;
  private _volume = 1;

  private readonly _tracks: Set<AudioTrack> = new Set();

  public constructor(type: AudioTrackType) {
    this._prop = AUDIO_MAP[type];
  }

  public setVolume(volume: number): void {
    if (volume > 1) volume = volume / 100;
    if (volume < 0) volume = 0;
    if (volume > 1) volume = 1;

    this._volume = volume;
    for (const audio of this._tracks)
      audio.volume = volume;
  }

  public stop(force = false): void {
    if (!force && this._prop.end) return;

    for (const audio of this._tracks)
      audio.stop();
    this._tracks.clear();
  }

  public play(path: string): void {
    if (this.isPlaying(path)) return;
    if (!this._prop.multiple) this.stop();
    this._tracks.add(new AudioTrack(
      path,
      this._prop.loop,
      this._volume
    ));
  }

  public isPlaying(path: string): boolean {
    for (const audio of this._tracks) {
      if (audio.path === path && audio.playing)
        return true;
    }

    return false;
  }

}
