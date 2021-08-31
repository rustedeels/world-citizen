import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  EngineModule,
  EventsModule,
  LoggerModule,
  LogLevel,
} from '@ngx-batatas/engine';

import { AppComponent } from './app.component';
import { NewGameHandler } from './new-game.handler';
import { ResModule } from './resources/res.module';
import { StoryModule } from './stories/story.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EventsModule.forHandlers([NewGameHandler]),
    LoggerModule.forLevel(LogLevel.all, true),
    ResModule,
    EngineModule.forRoot({
      appName: 'world-citizen',
      isDevelopment: !environment.production,
      developer: 'Rustedeels',
      title: 'World Citizen'
    }),
    StoryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
