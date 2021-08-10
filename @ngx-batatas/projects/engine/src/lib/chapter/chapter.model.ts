import { EntityState } from '@datorama/akita';

export type Media = MediaStatic | MediaDynamic;

export interface MediaStatic {
  /** Resource id */
  id: string;
  /** Loop until stopped or conxtext ends */
  loop: boolean;
  /** Stop when context ends */
  end: boolean;
  /** Expression to define if is valid */
  bool: string;
}

export interface MediaDynamic {
  /** Expression to load resource id */
  loader: string;
  /** Loop until stopped or conxtext ends */
  loop: boolean;
  /** Stop when context ends */
  end: boolean;
  /** Expression to define if is valid */
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
}

export interface ChaptersGenerator {
  id: string;
  resMap: { [key: string]: string };
  charMap: { [key: string]: string };
  chapters: string[];
}

export interface ChapterState extends EntityState<Chapter, string> {}
export const ChapterStoreName = '$chapters';
