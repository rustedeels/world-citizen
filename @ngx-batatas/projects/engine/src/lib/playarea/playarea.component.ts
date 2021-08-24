import {
  Component,
  OnInit,
} from '@angular/core';

import { LoggerService } from '../logger';
import {
  PlayAreaState,
  PlayAreaStateMachine,
} from '../states/play-area.state';
import { SettingsService } from '../system/settings.service';

@Component({
  selector: 'batatas-play-area',
  template: `
<div class="bt-play-area full-screen">
  <ng-container [ngSwitch]="state">
    <bt-loading-screen *ngSwitchCase="'loading'" ></bt-loading-screen>
    <bt-main-menu *ngSwitchCase="'mainMenu'" ></bt-main-menu>
    <div *ngSwitchDefault></div>
  </ng-container>
</div>`
})
export class PlayAreaComponent implements OnInit {
  public state: Extract<keyof PlayAreaState, string> | 'waiting' = 'waiting';

  public constructor(
    private readonly _settingsService: SettingsService,
    private readonly _stateMachine: PlayAreaStateMachine,
    private readonly _logger: LoggerService,
  ) { }

  public async ngOnInit() {
    await this._settingsService.refreshSettings();
    this._stateMachine.state.subscribe(e => {
      this._logger.engine('PlayArea:', e);
      this.state = e;
    });
  }
}
