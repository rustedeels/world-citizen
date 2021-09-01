import { Injectable } from '@angular/core';

import { ShowCustomView } from '../../custom-view/custom-view.model';
import { BatatasEventsMap } from '../../events/batatas.events';
import { EventHandler } from '../../events/decorator';
import { NavigationService } from '../../system';

@Injectable()
export class NavHandlers {
  public constructor(
    private readonly _navService: NavigationService
  ) {}

  @EventHandler<BatatasEventsMap>('goToCustomView')
  public onCustomViewNav(val?: ShowCustomView<any>): void {
    if (!val?.name) return;
    this._navService.goToCustomView(val.name, val?.params);
  }
}
