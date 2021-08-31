import { Injectable } from '@angular/core';

import { ServiceReset } from '../shared/service.model';

@Injectable({ providedIn: 'platform' })
export class ResetService {
  private readonly _toReset: ServiceReset[] = [];

  public register(...services: ServiceReset[]) {
    this._toReset.push(...services);
  }

  public async reset(): Promise<void> {
    for (const s of this._toReset)
      await s.reset();
  }
}
