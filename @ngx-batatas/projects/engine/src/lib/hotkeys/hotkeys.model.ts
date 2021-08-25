export interface HotkeyBuilder {
  preventDefault: boolean;
  keys: string[];
  event: string;
}

export interface HotkeyProp {
  preventDefault: boolean;
  event: string;
}

export interface HotkeyMap {
  [key: string]: HotkeyProp | undefined;
}

export interface HotkeyTrack {
  [key: string]: boolean | undefined
}

export function serializeHotkey(builder: HotkeyBuilder): string {
  return builder.keys.sort().map(e => e.toLowerCase()).join(';');
}

export type HotkeyTarget = HTMLElement | Document;
