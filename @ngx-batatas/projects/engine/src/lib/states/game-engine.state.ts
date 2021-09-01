import { Injectable } from '@angular/core';

import { StateMachine } from './state-machine';

export interface GameEngineState {
  waiting: never;
  chapter: never;
  customView: never;
}

@Injectable({ providedIn: 'platform' })
export class GameEngineStateMachine extends StateMachine<GameEngineState> {
  public constructor() {
    super('waiting');
  }
}
