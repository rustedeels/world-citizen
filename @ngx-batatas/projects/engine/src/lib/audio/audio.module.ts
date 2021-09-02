import { NgModule } from '@angular/core';

import { AudioService } from './audio.service';

@NgModule()
export class AudioModule {
  public constructor(_: AudioService) {}
}
