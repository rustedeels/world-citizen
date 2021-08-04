import { NgModule } from '@angular/core';

import { OSPathMapService } from './path-map.service';

@NgModule({})
export class SystemModule {
  public constructor(
    pathMap: OSPathMapService,
  ) {
    pathMap.refresh();
  }
}
