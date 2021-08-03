import { environment } from 'src/environments/environment';

import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { akitaDevtools } from '@datorama/akita';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { EngineModule, LoggerModule, LogLevel } from '@ngx-batatas/engine';

import { AppComponent } from './app.component';
import { NewModule } from './new.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NewModule,
    LoggerModule.forLevel(LogLevel.all),
    EngineModule.forRoot(environment.production),
    AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(zone: NgZone) {
    akitaDevtools(zone)
  }
}
