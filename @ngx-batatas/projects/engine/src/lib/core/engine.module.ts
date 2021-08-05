import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';
import { akitaDevtools } from '@datorama/akita';

import { DateTimeModule } from '../date-time/date-time.module';
import { EvaluatorModule } from '../evaluator';
import { EventsModule } from '../events/events.module';
import { INTERNAL_EVALUATORS } from '../internal/evaluators';
import { LoggerService } from '../logger/logger.service';
import { ResourcesModule } from '../resources/resources.module';
import { SystemModule } from '../system/system.module';
import { EngineStore } from './engine.store';

let isProd = false;

@NgModule({
  imports: [
    SystemModule,
    EventsModule.forRoot([]),
    DateTimeModule,
    ResourcesModule.forRoot(),
    EvaluatorModule.forRoot(INTERNAL_EVALUATORS),
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
