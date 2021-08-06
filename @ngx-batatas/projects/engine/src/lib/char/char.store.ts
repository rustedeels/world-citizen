import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { LoggerService } from '../logger';
import { ResourcesQuery } from '../resources';
import { CharState, CharStoreName } from './char.model';

@StoreConfig({ name: CharStoreName })
@Injectable({ providedIn: 'platform' })
export class CharStore extends EntityStore<CharState> {
  public constructor(
    private readonly _res: ResourcesQuery,
    private readonly _logger: LoggerService,
  ) { super() }

  public setPortrait(id: string, resId: string): void {
    const res = this._res.getEntity(resId);
    if (!res) {
      this._logger.error(`Error char[${id}]: resource not found`, resId);
      return;
    }
    this.update(id, { portrait: res.path });
  }
}
