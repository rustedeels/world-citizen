import {
  getGlobal,
  setGlobal,
} from '../tools/global.tools';
import { BatatasState } from './engine.model';

type BatatasKey = keyof BatatasState;

const GLOBAL_MAP: { [key in BatatasKey]: Symbol } = {
  isDevelopment: Symbol('batatas_isDevelopment'),
  musicVolume: Symbol('batatas_musicVolume'),
  soundVolume: Symbol('batatas_soundVolume'),
}

const DEFAULT: { [key in BatatasKey]: BatatasState[key] } = {
  isDevelopment: false,
  musicVolume: 1,
  soundVolume: 1,
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
