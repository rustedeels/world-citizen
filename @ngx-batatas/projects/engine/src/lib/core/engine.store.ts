import { Injectable } from '@angular/core';
import {
  Store,
  StoreConfig,
} from '@datorama/akita';

import { version } from '../STATE.json';
import {
  EngineState,
  EngineStoreName,
} from './engine.model';

function createInitialState(): EngineState {
  return {
    version: version as any,
  }
}

@Injectable({ providedIn: 'platform' })
@StoreConfig({ name: EngineStoreName })
export class EngineStore extends Store<EngineState> {
  public constructor() {
    super(createInitialState());
  }
}
