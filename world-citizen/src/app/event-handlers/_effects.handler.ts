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
  public async onFadeToBlack(p?: { id?: string, time?: number }) {
    document.querySelector('body')?.classList?.add('effect', 'fade-to-black');

    const timeout = !p?.time || p.time < 5000 ? 5000 : p.time;

    setTimeout(() => {
      if (p?.id) { this._navService.goToChapter(p.id); }
      setTimeout(() => {
        document.querySelector('body')?.classList?.remove('effect', 'fade-to-black');
      }, 500);
    }, timeout);
  }

  @EventHandler('fadeFromBlack')
  public async onFadeFromBlack() {
    document.querySelector('body')?.classList?.add('effect', 'fade-from-black');
    setTimeout(() => {
      document.querySelector('body')?.classList?.remove('effect', 'fade-from-black');
    }, 10000);
  }

  @EventHandler('lisbonCrashEffect')
  public async onCrashEffect (p?: { id?: string }) {
    document.querySelector('body')?.classList?.add('effect', 'crash');
    setTimeout(() => {
      document.querySelector('body')?.classList?.remove('effect', 'crash');
      if (p?.id) { this._navService.goToChapter(p.id); }
    }, 16000);
  }
}
