import { Type } from '@angular/core';

import { BaseEvaluator } from '../../evaluator';
import { ResourceCountEval } from './res-count.eval';

export const INTERNAL_EVALUATORS: Type<BaseEvaluator<any>>[] = [
  ResourceCountEval,
];
