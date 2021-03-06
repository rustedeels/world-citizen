import {
  ModuleWithProviders,
  NgModule,
  NgZone,
} from '@angular/core';

import { AttributesModule } from '../attr/attr.module';
import { AudioModule } from '../audio/audio.module';
import { BodyModule } from '../body/body.module';
import { ChapterModule } from '../chapter/chapter.module';
import { CharModule } from '../char/char.module';
import { DateTimeModule } from '../date-time/date-time.module';
import { EvaluatorModule } from '../evaluator/evaluator.module';
import { EventsModule } from '../events/events.module';
import { FixationModule } from '../fixation/fixation.module';
import { INTERNAL_EVALUATORS } from '../internal/evaluators/_index';
import { INTERNAL_HANDLERS } from '../internal/handlers/_index';
import { LoggerService } from '../logger/logger.service';
import { PlayAreaModule } from '../playarea/playarea.module';
import { ResourcesModule } from '../resources/resources.module';
import { SystemModule } from '../system/system.module';
import { setGlobalState } from './core.utils';
import { BatatasState } from './engine.model';
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
    ChapterModule.forRoot(),
    EventsModule.forRoot(INTERNAL_HANDLERS),
    PlayAreaModule,
    AudioModule,
  ],
  exports: [PlayAreaModule]
})
export class EngineModule {
  public constructor(_: EngineStore, logger: LoggerService, zone: NgZone) {
    logger.engine('Engine module initiated');
  }

  public static forRoot(state?: Partial<BatatasState>): ModuleWithProviders<EngineModule> {
    if (state) setGlobalState(state);
    return {
      ngModule: EngineModule,
      providers: []
    };
  }
}
