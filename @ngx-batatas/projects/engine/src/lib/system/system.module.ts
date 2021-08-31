import { NgModule } from '@angular/core';

import { RenderService } from '../render/render.service';
import { OSPathMapService } from './path-map.service';
import { UserDataService } from './user-data.service';

@NgModule({})
export class SystemModule {
  public constructor(
    _: OSPathMapService,
    __: UserDataService,
    ___: RenderService,
  ) {}
}
