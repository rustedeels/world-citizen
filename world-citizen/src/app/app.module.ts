import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  EngineModule,
  LoggerModule,
  LogLevel,
  WidgetsModule,
} from '@ngx-batatas/engine';

import { AppComponent } from './app.component';
import {
  COMPONENTS,
  ComponentService,
} from './components/_index';
import { EvaluatorsModule } from './evaluators/evaluators.module';
import { EventHandlersModule } from './event-handlers/event-handlers.module';
import { ResModule } from './resources/res.module';
import { StoryModule } from './stories/story.module';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS,
  ],
  imports: [
    BrowserModule,
    WidgetsModule,
    EventHandlersModule,
    LoggerModule.forLevel(LogLevel.all, true),
    EvaluatorsModule,
    ResModule,
    EngineModule.forRoot({
      appName: 'world-citizen',
      isDevelopment: !environment.production,
      developer: 'Rustedeels',
      title: 'World Citizen'
    }),
    StoryModule,
  ],
  providers: [ComponentService],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(
    _: ComponentService,
  ) {}
}
