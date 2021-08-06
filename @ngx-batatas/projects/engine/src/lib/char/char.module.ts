import { NgModule } from '@angular/core';

import { LoggerService } from '../logger';
import { CharStore } from './char.store';

@NgModule()
export class CharModule {
  public constructor(
    _logger: LoggerService,
    _: CharStore,
  ) { _logger.engine('Character module initiated'); }
}
