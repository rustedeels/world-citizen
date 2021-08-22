import { NgModule } from '@angular/core';
import {
  ChapterModule,
  ResourcesModule,
} from '@ngx-batatas/engine';

import { NEW_GAME_GENERATOR } from './new-game.chapter';
import { STORY_RESOURCES } from './resources.res';

@NgModule({
  imports: [
    ResourcesModule.forResource(STORY_RESOURCES),
    ChapterModule.forChapter([NEW_GAME_GENERATOR])
  ]
})
export class NewGameStoryModule {}
