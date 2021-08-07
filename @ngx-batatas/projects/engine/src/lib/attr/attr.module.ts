import { NgModule } from '@angular/core';

import { LoggerService } from '../logger';
import { CharAttributesStore } from './char-attr.store';

@NgModule()
export class AttributesModule {
  public constructor(
    logger: LoggerService,
    _: CharAttributesStore<any>
  ) { logger.engine('Attributes module initiated') }
}
