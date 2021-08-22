import { ChaptersGenerator } from '@ngx-batatas/engine';

import { CHARACTERS } from './characters.map';
import { RESOURCES } from './resources.map';

export const NEW_GAME_GENERATOR: ChaptersGenerator = {
  id: '00752e8c-2cc7-4c96-958a-e9279e1c977f',
  chapters: ['/assets/stories/new-game/intro.chapter.md'],
  charMap: CHARACTERS,
  resMap: RESOURCES
}
