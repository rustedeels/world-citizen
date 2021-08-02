import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ENGINE_STATE, EventsModule, LoggerModule, LogLevel } from '@ngx-batatas/engine';

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
    LoggerModule.forLevel(LogLevel.all),
    EventsModule.forRoot([HandlerService]),
    StoreModule.forRoot(ENGINE_STATE),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
