import { from, Observable } from 'rxjs';

import { EvaluatorStoreService } from './evaluator-store.service';
import { StateEval } from './evaluator.model';

export abstract class BaseEvaluator<T> implements StateEval<T> {

  public constructor(
    evalStore: EvaluatorStoreService,
    public readonly name: string,
  ) { evalStore.register(name, this); }

  public sync$(): Observable<unknown> {
    return from(Promise.resolve());
  }

  public sync(): Promise<unknown> {
    return Promise.resolve();
  }

  public abstract apply(...params: string[]): T;

}
