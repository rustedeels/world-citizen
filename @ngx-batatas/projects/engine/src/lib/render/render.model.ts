import { NextChapter } from '../chapter/chapter.model';
import { ResourceType } from '../resources';

export interface MediaResource {
  path: string;
  attr: string[];
  type: ResourceType
}

export interface MediaMap {
  chapter: MediaResource[];
  dialog: MediaResource[];
  text: MediaResource[];
}

export interface ChapterRender {
  id: string;
  dialogIndex: number;
  textIndex: number;
  charId: string;

  media: MediaMap;

  dialogText: string;

  charPortaitPath: string;
  charName: string;

  nextChapter: NextChapter[];
}

export const RenderStoreName = '$render-state';
export interface RenderState {
  state: 'waiting' | 'chapter';
  chapter: ChapterRender;
}

export function createInitialState(): RenderState {
  return {
    state: 'waiting',
    chapter: {
      id: '',
      dialogIndex: -1,
      textIndex: -1,
      charId: '',
      dialogText: '',
      charPortaitPath: '',
      charName: '',
      nextChapter: [],
      media: {
        chapter: [],
        dialog: [],
        text: [],
      },
    }
  }
}
