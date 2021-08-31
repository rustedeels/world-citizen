import {
  Component,
  OnInit,
} from '@angular/core';

import { LoggerService } from '../../logger/logger.service';
import {
  GameEngineState,
  GameEngineStateMachine,
} from '../../states/game-engine.state';

@Component({
  selector: 'bt-game-engine',
  template:`
<div class="bt-game-engine full-screen">
  <ng-container [ngSwitch]="state">
    <bt-chapter-render *ngSwitchCase="'chapter'" ></bt-chapter-render>
    <div *ngSwitchDefault></div>
  </ng-container>
</div>
`
})
export class GameEngineComponent implements OnInit {
  public state: Extract<keyof GameEngineState, string> = 'waiting';

  public constructor(
    private readonly _state: GameEngineStateMachine,
    private readonly _logger: LoggerService,
  ) {}

  public ngOnInit(): void {
    this._state.state.subscribe(e => {
      this._logger.engine('GameEngine:', e);
      this.state = e;
    })
  }

}
