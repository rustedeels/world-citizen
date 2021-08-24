import { Injectable } from '@angular/core';

import { StateMachine } from './state-machine';

export interface PlayAreaState {
  credits: never,
  loading: never,
  mainMenu: never,
  gameEngine: never,
}

@Injectable({ providedIn: 'platform' })
export class PlayAreaStateMachine extends StateMachine<PlayAreaState> {
  public constructor() {
    super('loading');
  }
}
