import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { DateTimeState, DateTimeStoreName } from './date-time.model';
import { dateTimeFromState, stateFromDateTime } from './date-time.tools';

function createInitialState(): DateTimeState {
  return {
    day: 1,
    month: 0,
    year: 2050,
    hour: 8,
    minute: 0,
  }
}

/** Date time store */
@Injectable({ providedIn: 'platform' })
@StoreConfig({ name: DateTimeStoreName })
export class DateTimeStore extends Store<DateTimeState> {

  public constructor() {
    super(createInitialState());
  }

  /**
   * Advance current time
   *
   * @param minutes number of minutes to advance
   */
  public advanceTime(minutes: number): void {
    const currentTime = dateTimeFromState(this.getValue());
    const toAdvance =  minutes * 60 * 1000;
    const newState = stateFromDateTime(new Date(currentTime.getTime() + toAdvance));

    this.update(_ => ({...newState}));
  }

  /**
   * Set current dateTime
   *
   * @param date date to set
   */
  public setTime(date: Date): void {
    const newState = stateFromDateTime(date);
    this.update(_ => ({...newState}));
  }
}
