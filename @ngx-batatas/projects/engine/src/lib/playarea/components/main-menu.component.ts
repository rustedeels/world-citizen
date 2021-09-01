import { Component } from '@angular/core';
import { exit } from '@tauri-apps/api/process';

import { getBatatas } from '../../core/core.utils';
import {
  BatatasEventsMap,
  EventsService,
} from '../../events';
import { LoggerService } from '../../logger';
import { PlayAreaStateMachine } from '../../states';
import { ResetService } from '../../system/reset.service';

@Component({
  selector: 'bt-main-menu',
  template: `
<div class="bt-main-menu full-screen flex flex-column">
  <div class="flex-grow-0 game-banner">
    <div class="image">
      <img src="/assets/icon.png" alt="Game icon" />
    </div>
    <div class="text">{{title}}</div>
  </div>
  <div class="f-grow-1 bt-main-menu__content">
    <div class="buttons">
      <bt-button (press)="onNewGame()" >New Game</bt-button>
      <bt-button
        *ngIf="isPauseMenu"
      >Save Game</bt-button>
      <bt-button>Load Game</bt-button>
      <bt-button>Settings</bt-button>
      <bt-button
        *ngIf="isPauseMenu"
        (press)="return()"
      >Return</bt-button>
      <bt-button (press)="onExit()" >Exit</bt-button>
    </div>
    <div class="active-content">

    </div>
  </div>
  <div class="flex-grow-0 dev-banner">
    <div class="text">developed by <span>{{developer}}</span></div>
    <img src="/assets/logo.png" alt="Developer logo" />
  </div>
</div>
`})
export class MainMenuComponent {
  public readonly title: string;
  public readonly developer: string;

  public get isPauseMenu() {
    return this._state.getPrevState() === 'gameEngine';
  }

  public constructor(
    private readonly _logger: LoggerService,
    private readonly _events: EventsService<BatatasEventsMap>,
    private readonly _state: PlayAreaStateMachine,
    private readonly _reset: ResetService,
  ) {
    this.title = getBatatas('title');
    this.developer = getBatatas('developer');

    setTimeout(() => {
      if (this.isPauseMenu) return;
      this.onNewGame();
    }, 300);
  }

  public onExit() {
    this._logger.engine('Exiting game');
    exit(0);
  }

  public async onNewGame() {
    await this._reset.reset();
    this._events.emit('newGameInit');
    this._state.nextState('gameEngine');
  }

  public return() {
    if (!this.isPauseMenu) this.return;
    this._state.prevState();
  }
}
