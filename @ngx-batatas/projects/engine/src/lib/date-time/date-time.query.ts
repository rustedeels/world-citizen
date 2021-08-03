import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { DateTimeState } from './date-time.model';
import { DateTimeStore } from './date-time.store';
import { dateTimeFromState } from './date-time.tools';

@Injectable({ providedIn: 'platform' })
export class DateTimeQuery extends Query<DateTimeState> {

  public current$ = this.select().pipe(map(dateTimeFromState));

  public get current() {
    return dateTimeFromState(this.getValue());
  }

  public constructor (protected store: DateTimeStore) {
    super(store)
  }

}
