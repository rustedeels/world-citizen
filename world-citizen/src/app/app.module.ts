import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  EngineModule,
  EvaluatorModule,
  EventsModule,
  LoggerModule,
  LogLevel,
} from '@ngx-batatas/engine';

import { AppComponent } from './app.component';
import { HandlerService } from './handler.service';
import { NewModule } from './new.module';
import { ResourceCountEval2 } from './res-count.eval';
import { ResModule } from './resources/res.module';
import { StoryModule } from './stories/story.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NewModule,
    EventsModule.forHandlers([HandlerService]),
    LoggerModule.forLevel(LogLevel.all, true),
    EvaluatorModule.forEvaluators([ResourceCountEval2]),
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
