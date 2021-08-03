import { NgModule } from '@angular/core';

import { EventsModule } from '../events/events.module';
import { LoggerService } from '../logger/logger.service';
import { DateTimeHandlers } from './date-time.handler';

@NgModule({
  imports: [EventsModule.forHandlers([DateTimeHandlers])]
})
export class DateTimeModule {
  public constructor(logger: LoggerService) {
    logger.engine('DateTime module initiated');
  }
}
