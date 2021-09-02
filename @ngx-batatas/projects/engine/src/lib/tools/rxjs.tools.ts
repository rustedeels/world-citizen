import {
  Observable,
  Subscription,
} from 'rxjs';

import { StringMap } from '../shared/utils.model';

interface SubValue {
  key: any;
  sub?: Subscription;
}

/** Manage multiple subscriptions */
export class SubscriberManager<T extends string> {
  private readonly _state: StringMap<SubValue> = {}

  public subscribe<V, K>(name: T, value$: Observable<V>, key: K): void;
  public subscribe<V>(name: T, value$: Observable<V>): void;
  public subscribe(name: T, value$: Observable<any>, key: any = false): void {
    const state = this.getState(name);
    if (typeof key !== 'boolean' && state.key === key) return;

    state.sub?.unsubscribe();
    state.sub = value$.subscribe();
  }

  /** Unsubscribe all stored subscriptions */
  public clear(): void;
  /** Unsubscribe subscription for name */
  public clear(name: T): void;
  public clear(name?: T): void {
    if (name) {
      const s = this.getState(name);
      s.key = false;
      s.sub?.unsubscribe();
      return;
    }

    for (const k of Object.keys(this._state))
      if (k && typeof k === 'string')
        this.clear(k as T);
  }

  private getState(name: T): SubValue {
    let state = this._state[name];

    if (!state) {
      state = { key: false };
      this._state[name] = state;
    }

    return state;
  }
}
