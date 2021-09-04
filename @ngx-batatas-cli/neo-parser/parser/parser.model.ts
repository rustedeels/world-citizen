export interface RawParserResult {
  chapters: RawChapter[];
  places: RawPlace[];
  markers: RawMarker[];
}

export type RawFileType = 'chapter' | 'place' | 'marker'

export interface RawFile {
  path: string;
  type: RawFileType;
}

export interface RawChapter {
  name: string;
  bool: string;
  timeout: number;
  party: RawProperty[];
  dialog: RawDialog[];
  media: RawProperty[];
  actions: RawProperty[];
  next: RawProperty[];
}

export interface RawDialog {
  name: string;
  character: number;
  media: RawProperty[];
  bool: string;
  text: RawTextDialog[];
  css: RawProperty[];
}

export interface RawTextDialog {
  text: string;
  media: RawProperty[];
  css: RawProperty[];
  bool: string;
}

export interface RawProperty {
  name: string;
  props: string;
  bool: string;
}

export interface RawSize {
  width: number;
  height: number;
}

export interface RawPlace {
  name: string;
  media: RawProperty[];
  events: RawProperty[];
  size: RawSize;
  bool: string;
}

export type RawMarkerMediaType = 'iddle' | 'click' | 'hover';

export interface RawMarkerMedia {
  media: RawProperty[];
  css: RawProperty[];
  size: RawSize;
  pos: RawSize;
  bool: string;
  type: RawMarkerMediaType;
}

export interface RawMarker {
  name: string;
  targets: RawProperty[];
  css: RawProperty[];
  media: RawMarkerMedia[];
  bool: string;
  events: RawProperty[];
  chapter: RawProperty[];
  place: RawProperty[];
}

export interface BaseToken {
  regex: RegExp;
}

export interface SingleToken extends BaseToken {
  multi: false;
}

export interface MultiToken extends BaseToken {
  multi: true;
}

export type Token = SingleToken | MultiToken;

export interface Generator {
  files: RawFile[];
  resMap: StringMap<string>;
  charMap: StringMap<string>;
}

export interface StringMap<T> {
  [key: string]: T | undefined
}
