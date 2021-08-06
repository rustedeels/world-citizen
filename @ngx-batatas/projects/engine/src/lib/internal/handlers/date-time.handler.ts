import { Injectable } from '@angular/core';

import { DateTimeEventsMap } from '../../date-time/date-time.model';
import { DateTimeStore } from '../../date-time/date-time.store';
import { EventHandler } from '../../events/decorator';

@Injectable()
export class DateTimeHandlers {
  public constructor(private readonly _store: DateTimeStore) {}

  @EventHandler<DateTimeEventsMap>('advanceTime')
  public onAdvanceMinutes(n: number) {
    this._store.advanceTime(n);
  }

  @EventHandler<DateTimeEventsMap>('advance15minutes')
  public onAdvance15Minutes() {
    this._store.advanceTime(15);
  }

  @EventHandler<DateTimeEventsMap>('advance1hour')
  public onAdvance1hour() {
    this._store.advanceTime(60);
  }
}
