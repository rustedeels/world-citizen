import { Howl } from 'howler';

import { ResourceType } from '../resources';

export type AudioTrack = 'music' | 'effect' | 'ambient' | 'system';

export interface AudioFile {
  path: string;
  track: AudioTrack;
}

export interface AudioInstance {
  path?: string;
  id?: number;
  howl?: Howl;
  track: AudioTrack;
  playing: boolean;
}

export type AutioTrackMap = {
  [key in AudioTrack]: AudioInstance;
}

export function buildAudioFile(path: string, type?: ResourceType, props?: string[]): AudioFile {
  let track: AudioTrack = 'system';

  if (type) {
    switch (type) {
      case 'music':
        track = 'music';
        break;
      case 'sound':
        track = props?.find(e => e === 'LOOP') ? 'ambient' : 'effect';
        break;
    }
  }

  return { path, track };
}
