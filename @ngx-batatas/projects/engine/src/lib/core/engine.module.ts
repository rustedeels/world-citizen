import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';

import { AttributesModule } from '../attr/attr.module';
import { BodyModule } from '../body/body.module';
import { CharModule } from '../char/char.module';
import { DateTimeModule } from '../date-time/date-time.module';
import { EvaluatorModule } from '../evaluator/evaluator.module';
import { EventsModule } from '../events/events.module';
import { FixationModule } from '../fixation/fixation.module';
import { INTERNAL_EVALUATORS } from '../internal/evaluators/_index';
import { INTERNAL_HANDLERS } from '../internal/handlers/_index';
import { LoggerService } from '../logger/logger.service';
import { ResourcesModule } from '../resources/resources.module';
import { SystemModule } from '../system/system.module';
import { EngineStore } from './engine.store';

@NgModule({
  imports: [
    SystemModule,
    DateTimeModule,
    ResourcesModule.forRoot(),
    EvaluatorModule.forRoot(INTERNAL_EVALUATORS),
    CharModule,
    BodyModule,
    AttributesModule,
    FixationModule,
    EventsModule.forRoot(INTERNAL_HANDLERS),
  ]
})
export class EngineModule {
  public constructor(_: EngineStore, logger: LoggerService, zone: NgZone) {
    logger.engine('Engine module initiated');
  }

  public static forRoot(_?: boolean): ModuleWithProviders<EngineModule> {
    return {
      ngModule: EngineModule,
      providers: []
    };
  }
}
