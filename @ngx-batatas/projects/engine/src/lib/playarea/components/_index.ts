import { Type } from '@angular/core';

import { GameEngineComponent } from './game-engine.component';
import { GAME_ENGINE_COMPONENTS } from './game-engine/_index';
import { LoadingScreenComponent } from './loading-screen.component';
import { MainMenuComponent } from './main-menu.component';

export const PLAY_ELEMS: Type<unknown>[] = [
  LoadingScreenComponent,
  MainMenuComponent,
  GameEngineComponent,
  ...GAME_ENGINE_COMPONENTS,
];
