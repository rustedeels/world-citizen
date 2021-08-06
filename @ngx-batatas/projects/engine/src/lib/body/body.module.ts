import { NgModule } from '@angular/core';

import { LoggerService } from '../logger';
import { BodyStore } from './body.store';

@NgModule()
export class BodyModule {
  public constructor(
    logger: LoggerService,
    _: BodyStore,
  ) { logger.engine('Body module initiated') }
}
