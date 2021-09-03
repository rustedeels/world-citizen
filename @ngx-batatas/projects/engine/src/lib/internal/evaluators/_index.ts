import { Type } from '@angular/core';

import { BaseEvaluator } from '../../evaluator';
import { PLAYER_EVALS } from './player.eval';
import { ResourceCountEval } from './res-count.eval';

export const INTERNAL_EVALUATORS: Type<BaseEvaluator<any>>[] = [
  ResourceCountEval,
  ...PLAYER_EVALS,
];
