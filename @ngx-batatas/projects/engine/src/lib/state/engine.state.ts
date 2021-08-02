import { Action, createReducer } from '@ngrx/store';

import { version } from '../../STATE.json';
import { EngineState } from '../models/version.model';

const engineState: EngineState = {
  version: version as any
};
const reducer = createReducer(engineState);
export function engineStateReducer(s: EngineState | undefined, a: Action) {
  return reducer(s, a);
}

export const ENGINE_STATE = {
  engine: engineStateReducer
};
