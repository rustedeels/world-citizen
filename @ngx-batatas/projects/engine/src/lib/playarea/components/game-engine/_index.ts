import { Type } from '@angular/core';

import { ChapterDialogRenderComponent } from './chapter-render/chapter-dialog-render.component';
import { ChapterMediaRenderComponent } from './chapter-render/chapter-media-render.component';
import { ChapterNextRenderComponent } from './chapter-render/chapter-next-render.component';
import { ChapterRenderComponent } from './chapter-render/chapter-render.component';
import { CustomViewComponent } from './custom-view/custom-view.component';

export const GAME_ENGINE_COMPONENTS: Type<unknown>[] = [
  ChapterRenderComponent,
  ChapterMediaRenderComponent,
  ChapterDialogRenderComponent,
  ChapterNextRenderComponent,
  CustomViewComponent,
];
