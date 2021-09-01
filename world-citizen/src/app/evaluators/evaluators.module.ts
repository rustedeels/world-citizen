import {
  NgModule,
  Type,
} from '@angular/core';
import {
  BaseEvaluator,
  EvaluatorModule,
} from '@ngx-batatas/engine';

import { PlayerInfoCompleted } from './player-info-completed.evaluator';

const EVALUATORS: Type<BaseEvaluator<any>>[] = [
  PlayerInfoCompleted,
];

@NgModule({
  imports: [EvaluatorModule.forEvaluators(EVALUATORS)],
  providers: [EVALUATORS]
})
export class EvaluatorsModule {}
