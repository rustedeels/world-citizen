import {
  Component,
  OnInit,
} from '@angular/core';

import { SettingsService } from '../system/settings.service';

@Component({
  selector: 'batatas-play-area',
  template: `<div class="play-area">PlayArea</div>`
})
export class PlayAreaComponent implements OnInit {

  public constructor(
    private readonly _settingsService: SettingsService,
  ) {}

  public async ngOnInit() {
    await this._settingsService.refreshSettings();
  }
}
