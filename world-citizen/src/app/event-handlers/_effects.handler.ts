import { Injectable } from '@angular/core';
import {
  EventHandler,
  NavigationService,
} from '@ngx-batatas/engine';

@Injectable()
export class EffectsHandlers {
  public constructor(
    private readonly _navService: NavigationService,
  ) {}

  @EventHandler('fadeToBlack')
  public async onNewGame(p?: { id?: string, time?: number }) {
    document.querySelector('body')?.classList?.add('effect', 'fade-to-black');

    const timeout = !p?.time || p.time < 3000 ? 3000 : p.time;

    setTimeout(() => {
      if (p?.id) { this._navService.goToChapter(p.id); }
      setTimeout(() => {
        document.querySelector('body')?.classList?.remove('effect', 'fade-to-black');
      }, 500);
    }, timeout);
  }
}
