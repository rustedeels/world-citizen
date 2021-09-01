import {
  Inject,
  Injectable,
  Type,
} from '@angular/core';
import {
  CustomView,
  CustomViewStore,
} from '@ngx-batatas/engine';

import { PlayerConfigComponent } from './player-config/player-config.component';

export const COMPONENTS: Type<unknown>[] = [
  PlayerConfigComponent,
];

type StoreMap = { [key: string]: Type<CustomView<any>> }

const COMP_MAP: StoreMap = {
  playerConfig: PlayerConfigComponent,
}


@Injectable()
export class ComponentService {

  public constructor(
    @Inject(CustomViewStore) store: CustomViewStore,
  ) { this.registerComponents(store); }

  private registerComponents(store: CustomViewStore): void {
    for (const [name, view] of Object.entries(COMP_MAP))
      store.register(name, view);
  }
}
