import {
  ActiveState,
  EntityState,
} from '@datorama/akita';

import { StringMap } from '../shared/utils.model';

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
}

export interface RawTextDialog {
  text: string;
  media: RawProperty[];
  bool: string;
}

export interface RawProperty {
  name: string;
  props: string;
  bool: string;
}

export type Media = MediaStatic | MediaDynamic;

export interface MediaStatic {
  /** Resource id */
  id: string;
  /** Attributes */
  attr: string [];
  bool: string;
}

export interface MediaDynamic {
  /** Expression to load resource id */
  loader: string;
  /** Attributes */
  attr: string [];
  bool: string;
}

export interface DialogText {
  text: string;
  media: Media[];
  bool: string;
}

export interface Dialog {
  id: string;
  name: string;
  text: DialogText[];
  media: Media[];
  /** index of party member */
  party: number;
  bool: string;
}

export type PartyMember = PartyMemberStatic | PartyMemberDyn;
export interface PartyMemberStatic {
  /** CharId */
  id: string;
  bool: string;
}

export interface PartyMemberDyn {
  loader: string;
  bool: string;
}

export interface NextChapter {
  /** chapter id */
  id: string;
  text: string;
  bool: string;
}

export type ChapterAction = {
  event: string;
  params: string;
  bool: string;
}

export interface Chapter {
  id: string;
  name: string;
  media: Media[];
  party: PartyMember[];
  dialogs: Dialog[];
  next: NextChapter[];
  actions: ChapterAction[];
  bool: string;
  timeout: number;
}

export interface ChaptersGenerator {
  id: string;
  resMap: StringMap<string>;
  charMap: StringMap<string>;
  chapters: string[];
}

export interface ChapterState extends EntityState<Chapter, string>, ActiveState {}
export const ChapterStoreName = '$chapters';

export const AUTO_NEXT_CHAPTER = '#AUTO';
