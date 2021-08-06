import { NgModule } from '@angular/core';

import { LoggerService } from '../logger/logger.service';

@NgModule()
export class DateTimeModule {
  public constructor(logger: LoggerService) {
    logger.engine('DateTime module initiated');
  }
}
