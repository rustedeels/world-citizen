import { Type } from '@angular/core';

import { GameEngineComponent } from './game-engine.component';
import { LoadingScreenComponent } from './loading-screen.component';
import { MainMenuComponent } from './main-menu.component';

export const PLAY_ELEMS: Type<unknown>[] = [
  LoadingScreenComponent,
  MainMenuComponent,
  GameEngineComponent,
];
