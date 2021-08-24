import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WidgetsModule } from '../widgets/widgets.module';
import { PLAY_ELEMS } from './components/_index';
import { PlayAreaComponent } from './playarea.component';

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule
  ],
  declarations: [
    PLAY_ELEMS,
    PlayAreaComponent
  ],
  exports: [PlayAreaComponent],
})
export class PlayAreaModule {}
