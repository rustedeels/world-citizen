import {
  Injectable,
  Type,
} from '@angular/core';

import { BodyQuery } from '../../body';
import { PLAYER_ID } from '../../char';
import { EvaluatorStoreService } from '../../evaluator';
import { BaseEvaluator } from '../../evaluator/base-evaluator';

@Injectable()
export class PlayerHasDick extends BaseEvaluator<boolean> {

  public constructor(
    store: EvaluatorStoreService,
    private readonly query: BodyQuery,
  ) { super(store, 'hasDick') }

  public apply(): boolean {
    return this.query.getEntity(PLAYER_ID)?.parts?.gen?.name
      ?.toLowerCase()?.indexOf('dick') !== -1 ?? false;
  }
}

@Injectable()
export class PlayerHasPussy extends BaseEvaluator<boolean> {

  public constructor(
    store: EvaluatorStoreService,
    private readonly query: BodyQuery,
  ) { super(store, 'hasPussy') }

  public apply(): boolean {
    return this.query.getEntity(PLAYER_ID)?.parts?.gen?.name
      ?.toLowerCase()?.indexOf('pussy') !== -1 ?? false;
  }
}

@Injectable()
export class PlayerHasFemBody extends BaseEvaluator<boolean> {

  public constructor(
    store: EvaluatorStoreService,
    private readonly query: BodyQuery,
  ) { super(store, 'hasFemBody') }

  public apply(): boolean {
    return this.query.getEntity(PLAYER_ID)?.parts.body.name
      .toLowerCase().indexOf('female') !== -1 ?? false;
  }
}

@Injectable()
export class PlayerHasBoyBody extends BaseEvaluator<boolean> {

  public constructor(
    store: EvaluatorStoreService,
    private readonly query: BodyQuery,
  ) { super(store, 'hasMaleBody') }

  public apply(): boolean {
    return this.query.getEntity(PLAYER_ID)?.parts.body.name
      .toLowerCase().indexOf('female') === -1 ?? false;
  }
}

export const PLAYER_EVALS: Type<BaseEvaluator<any>>[] = [
  PlayerHasPussy,
  PlayerHasDick,
  PlayerHasBoyBody,
  PlayerHasFemBody,
]
