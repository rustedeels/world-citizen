import {
    APP_INITIALIZER, InjectionToken, Injector, ModuleWithProviders, NgModule, Type,
} from '@angular/core';

import { LoggerService } from '../logger';
import { BaseEvaluator } from './base-evaluator';

const BASE_EVALUATORS = new InjectionToken<Type<BaseEvaluator<any>>[][]>('BASE_EVALUATORS');

@NgModule()
export class EvaluatorModule {

  public constructor() {}

  public static forEvaluators(evals: Type<BaseEvaluator<any>>[]): ModuleWithProviders<EvaluatorModule> {
    return {
      ngModule: EvaluatorModule,
      providers: [
        ...evals,
        {
          provide: BASE_EVALUATORS,
          useValue: evals,
          multi: true,
        }
      ]
    }
  }

  public static forRoot(evals: Type<BaseEvaluator<any>>[]): ModuleWithProviders<EvaluatorModule> {
    return {
      ngModule: EvaluatorModule,
      providers: [
        ...evals,
        {
          provide: BASE_EVALUATORS,
          useValue: evals,
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: registerEvals,
          deps: [Injector, BASE_EVALUATORS, LoggerService],
          multi: true,
        }
      ]
    }
  }
}

function registerEvals(
  injector: Injector,
  evals: Type<BaseEvaluator<any>>[][],
  logger: LoggerService,
) {
  return () => {
    for (const t of evals.flatMap(e => e)) {
      const instance = injector.get(t);
      logger.engine('Loaded evaluator: ', instance.name);
    }
  }
}
