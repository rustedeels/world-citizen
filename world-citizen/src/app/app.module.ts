import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventsModule, LoggerModule, LogLevel } from '@ngx-batatas/engine';

import { AppComponent } from './app.component';
import { HandlerService } from './handler.service';
import { NewModule } from './new.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoggerModule.forLevel(LogLevel.all),
    NewModule,
    EventsModule.forRoot([HandlerService]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
