import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventsModule } from '@ngx-batatas/engine';

import { NewService } from './new.service';

@NgModule({
  imports: [
    CommonModule,
    EventsModule.forHandlers([NewService])
  ]
})
export class NewModule {}
