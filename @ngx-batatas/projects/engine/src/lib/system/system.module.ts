import { NgModule } from '@angular/core';

import { OSPathMapService } from './path-map.service';
import { UserDataService } from './user-data.service';

@NgModule({})
export class SystemModule {
  public constructor(
    pathMap: OSPathMapService,
    userData: UserDataService,
  ) {
    pathMap.refresh();
    userData.ensureBaseDir();
  }
}
