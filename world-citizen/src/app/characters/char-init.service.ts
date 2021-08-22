import {
  forkJoin,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

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
    const chars = CHARACTERS.map(c => this._charQuery
      .selectEntity(c.id).pipe(map(res => ({ exists: !!res, char: c }))))
    return forkJoin(chars).pipe(
      map(res => {
        this._events.emit('charInit', res.filter(e => !e.exists).map(e => e.char));

        return true;
      })
    )
  }
}
