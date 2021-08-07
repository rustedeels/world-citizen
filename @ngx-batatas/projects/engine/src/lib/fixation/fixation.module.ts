import { NgModule } from '@angular/core';

import { LoggerService } from '../logger';
import { FixationStore } from './fixation.store';

@NgModule()
export class FixationModule {
  public constructor(
    logger: LoggerService,
    _: FixationStore,
  ) { logger.engine('Fixation module initiated') }
}
