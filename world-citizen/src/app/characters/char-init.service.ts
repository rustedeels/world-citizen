import { Observable } from 'rxjs';
import {
  map,
  take,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  BatatasEventsMap,
  CharQuery,
  EventsService,
} from '@ngx-batatas/engine';

import { CHARACTERS } from './character.init';

@Injectable({ providedIn: 'root' })
export class CharInitService {
  public constructor(
    private readonly _charQuery: CharQuery,
    private readonly _events: EventsService<BatatasEventsMap>,
  ) {}

  public initChars(): Observable<boolean> {
    return this._charQuery.selectAll()
      .pipe(
        take(1),
        map(storeChars => CHARACTERS
          .filter(e => storeChars.findIndex(c => c.id === e.id) === -1)),
        map(toAdd => {
          if (!toAdd) return false;
          this._events.emit('charInit', toAdd);
          return true;
        })
      )
  }
}
