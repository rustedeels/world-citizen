import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';
import { akitaDevtools } from '@datorama/akita';

import { DateTimeModule } from '../date-time/date-time.module';
import { EventsModule } from '../events/events.module';
import { LoggerService } from '../logger/logger.service';
import { EngineStore } from './engine.store';

let isProd = false;

@NgModule({
  imports: [
    EventsModule.forRoot([]),
    DateTimeModule,
  ]
})
export class EngineModule {
  public constructor(_: EngineStore, logger: LoggerService, zone: NgZone) {
    logger.engine('Engine module initiated');
    if (!isProd) { akitaDevtools(zone); }
  }

  public static forRoot(production?: boolean): ModuleWithProviders<EngineModule> {
    isProd = !!production;

    return {
      ngModule: EngineModule,
      providers: []
    };
  }
}
