import { BehaviorSubject } from 'rxjs';

import {
  Injectable,
  Type,
} from '@angular/core';

import { LoggerService } from '../logger';
import { StringMap } from '../shared/utils.model';
import { CustomView } from './custom-view.model';

@Injectable({ providedIn: 'platform' })
export class CustomViewStore {
  private _map: StringMap<Type<CustomView<any>>> = {};

  public active = new BehaviorSubject<[view: Type<CustomView<any>>, params?: any] | undefined>(undefined);

  public constructor(
    private readonly _logger: LoggerService,
  ) {}

  public contains(name: string): boolean {
    return !!this._map[name];
  }

  public register(name: string, view: Type<CustomView<any>>): void {
    if (this.contains(name)) {
      this._logger.warning('Duplicated view name', name);
    }

    this._map[name] = view;
  }

  public get(name: string): Type<CustomView<any>> | undefined {
    return this._map[name];
  }

  public setActive(name?: string, params?: any): boolean {
    if (!name) {
      this.active.next(undefined);
      return false;
    }

    const value = this.get(name);
    this.active.next(value ? [value, params] : undefined);

    if (!value) {
      this._logger.warning('Custom view not found for', name);
    }

    return !!value;
  }
}
