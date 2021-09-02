import {
  NgModule,
  Type,
} from '@angular/core';
import { EventsModule } from '@ngx-batatas/engine';

import { EffectsHandlers } from './_effects.handler';
import { NewGameHandler } from './_new-game.handler';

const HANDLERS: Type<unknown>[] = [
  NewGameHandler,
  EffectsHandlers,
];

@NgModule({
  imports: [EventsModule.forHandlers(HANDLERS)]
})
export class EventHandlersModule {}
