export class AudioTrack {
  private readonly _audio: HTMLAudioElement;
  private readonly _path: string;
  private _isPlaying = true;

  public get playing() { return this._isPlaying; }
  public get path() { return this._path; }

  public get volume() {
    return this._audio.volume;
  }

  public set volume(v: number) {
    this._audio.volume = v;
  }

  public constructor(
    path: string,
    loop: boolean,
    volume: number,
  ) {
    this._audio = this
      .initAudio(path, loop, volume);
    this._path = path;
  }

  public stop() {
    this._audio.pause();
    this._isPlaying = false;
  }

  private initAudio(
    path: string,
    loop: boolean,
    volume: number,
  ) {
    const audio = new Audio(path);
    audio.loop = loop;
    audio.volume = volume;
    audio.autoplay = true;

    audio.onended = () => this._isPlaying = false;
    audio.onplaying = () => this._isPlaying = true;
    audio.onpause = () => this._isPlaying = false;

    return audio;
  }

}
