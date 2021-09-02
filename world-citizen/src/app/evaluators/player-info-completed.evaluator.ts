import { Injectable } from '@angular/core';
import {
  BaseEvaluator,
  CharQuery,
  EvaluatorStoreService,
  PLAYER_ID,
} from '@ngx-batatas/engine';

@Injectable()
export class PlayerInfoCompleted extends BaseEvaluator<boolean> {

  public constructor(
    store: EvaluatorStoreService,
    private readonly _charQuery: CharQuery,
  ) { super(store, 'playerInfoCompleted') }

  public apply(): boolean {
    const player = this._charQuery.getEntity(PLAYER_ID);
    return !!(player
      && player.name
      && player.surname);
  }

}
