import { Injectable } from '@angular/core';
import {
  EventHandler,
  NavigationService,
} from '@ngx-batatas/engine';

import { CharInitService } from '../characters/char-init.service';

@Injectable()
export class NewGameHandler {
  public constructor(
    private readonly _charInit: CharInitService,
    private readonly _navService: NavigationService,
  ) {}

  @EventHandler('newGameInit')
  public async onNewGame() {
    await this._charInit.initChars().toPromise();
    this._navService.goToChapter('closeEyes', '00752e8c-2cc7-4c96-958a-e9279e1c977f');
  }
}
