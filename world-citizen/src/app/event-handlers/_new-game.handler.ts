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
    this._navService.goToChapter('Intro', '00752e8c-2cc7-4c96-958a-e9279e1c977f');
    // this._navService.goToChapter('8a3dfb1c-a9f9-4046-a37f-0a8af85097b9=>intro');
  }
}
