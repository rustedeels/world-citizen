import { Injectable } from '@angular/core';
import {
  BaseEvaluator,
  EvaluatorStoreService,
} from '@ngx-batatas/engine';

@Injectable()
export class PlayerInfoCompleted extends BaseEvaluator<boolean> {

  public constructor(
    store: EvaluatorStoreService,
  ) { super(store, 'playerInfoCompleted') }

  apply(): boolean {
    return true;
  }

}
