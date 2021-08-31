import { Injectable } from '@angular/core';

import { ServiceInit } from '../shared/service.model';

@Injectable({ providedIn: 'platform' })
export class InitService {
  private readonly _toInit: ServiceInit[] = [];

  public register(...services: ServiceInit[]) {
    this._toInit.push(...services);
  }

  public async init(): Promise<void> {
    for (const s of this._toInit)
      await s.init();
  }
}
