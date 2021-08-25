import { Injectable } from '@angular/core';

import { BatatasEventsMap } from '../../events/batatas.events';
import { EventHandler } from '../../events/decorator';
import { PlayAreaStateMachine } from '../../states';

@Injectable()
export class GlobalHotkeyHandler {
  public constructor(
    private readonly _playState: PlayAreaStateMachine,
  ) {}

  @EventHandler<BatatasEventsMap>('togglePauseMenu')
  public onTogglePauseMenu(): void {
    switch (this._playState.name) {
      case 'gameEngine':
        this._playState.nextState('mainMenu');
        break;
      case 'mainMenu':
        if (this._playState.getPrevState() !== 'gameEngine') break;
        this._playState.prevState();
        break;
      default: break;
    }
  }
}
