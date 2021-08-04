import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EngineModule, EventsModule, LoggerModule, LogLevel } from '@ngx-batatas/engine';

import { AppComponent } from './app.component';
import { HandlerService } from './handler.service';
import { NewModule } from './new.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NewModule,
    EventsModule.forHandlers([HandlerService]),
    LoggerModule.forLevel(LogLevel.error, true),
    EngineModule.forRoot(environment.production),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
