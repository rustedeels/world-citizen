import {
  getGlobal,
  setGlobal,
} from '../tools/global.tools';
import { BatatasState } from './engine.model';

type BatatasKey = keyof BatatasState;

const GLOBAL_MAP: { [key in BatatasKey]: Symbol } = {
  isDevelopment: Symbol('batatas_isDevelopment'),
  appName: Symbol('batatas_app_name'),
  developer: Symbol('batatas_game_dev'),
  title: Symbol('batatas_title'),
}

const DEFAULT: { [key in BatatasKey]: BatatasState[key] } = {
  isDevelopment: false,
  appName: 'BatatasEngineApp',
  developer: 'Unknown',
  title: 'Game'
}

export function setBatatas<T extends BatatasKey>(key: T, value: BatatasState[T]) {
  const symbol = GLOBAL_MAP[key] as symbol;
  setGlobal(symbol, value);
}

export function getBatatas<T extends BatatasKey>(key: T): BatatasState[T] {
  const symbol = GLOBAL_MAP[key] as symbol;
  const defaultValue = DEFAULT[key];
  return (getGlobal(symbol) ?? defaultValue) as BatatasState[T];
}

export function setGlobalState(state: Partial<BatatasState>): void {
  for (const key in state) {
    const value = state[key as BatatasKey];
    if (typeof value === 'undefined') continue;
    setBatatas(key as BatatasKey, value);
  }
}
