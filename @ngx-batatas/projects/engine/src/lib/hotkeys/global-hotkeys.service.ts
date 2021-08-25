import { Injectable } from '@angular/core';

import {
  BatatasEvents,
  EventsService,
} from '../events';
import { LoggerService } from '../logger';
import { HotkeyHandler } from './hotkey.handler';

@Injectable({ providedIn: 'platform' })
export class GlobalHotkeysService extends HotkeyHandler {
  public constructor(
    events: EventsService<any>,
    logger: LoggerService,
  ) {
    super(events, logger);
    this.initHotkeys();
  }

  private initHotkeys() {
    const event: BatatasEvents = 'togglePauseMenu';
    this.addHotkey({
      keys: ['Escape'],
      event
    })
  }
}
