import { MediaResource } from '../render/render.model';

export type AudioTrackType = 'music' | 'effect' | 'ambient' | 'system';

export interface AudioTrackProp {
  multiple: boolean;
  loop: boolean;
  end: boolean;
}

export type AudioTrackPropMap = {
  [key in AudioTrackType]: AudioTrackProp
}

/** Audio will loop */
export const AUDIO_PROP_LOOP = 'LOOP';
/** Audio can't be stopped */
export const AUDIO_PROP_END = 'END';

export const AUDIO_MAP: AudioTrackPropMap = {
  ambient: {
    multiple: false,
    end: false,
    loop: true,
  },
  effect: {
    multiple: true,
    end: true,
    loop: false,
  },
  system: {
    multiple: true,
    end: false,
    loop: false,
  },
  music: {
    multiple: false,
    end: false,
    loop: true,
  }
}

export interface AudioItem {
  path: string;
  track: AudioTrackType;
}

export function getTrackType(m: MediaResource): AudioTrackType {
  if (m.type === 'music') return 'music';

  if (m.attr.includes(AUDIO_PROP_LOOP)) return 'ambient';
  return m.attr.includes(AUDIO_PROP_END) ? 'effect' : 'system';
}

export function buildAudioItem(m: MediaResource): AudioItem {
  return {
    path: m.path,
    track: getTrackType(m)
  }
}
