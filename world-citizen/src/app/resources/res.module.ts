import { NgModule } from '@angular/core';
import { ResourcesModule } from '@ngx-batatas/engine';

import { STORY_RESOURCES } from './resources.res';

@NgModule({
  imports: [ResourcesModule.forResource(STORY_RESOURCES)]
})
export class ResModule {}
