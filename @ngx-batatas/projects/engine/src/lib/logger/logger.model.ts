import { isObject } from "../guards/object.guards";

export enum LogLevel {
  disabled = 0,
  error = 10,
  warning = 20,
  info = 30,
  debug = 40,
  engine = 50,
  all = 100,
}

export interface LogOption {
  /** Log level */
  level: number,
  /** Message to show */
  message: string;
  /** extra params */
  params?: any[];
  /** only log, if false */
  assert?: boolean;
  /** timmer name */
  timer?: string;
  /** preserve {} value by stringify */
  preserve?: boolean;
}

export type LogOptionExtra = {
  /** only log, if false */
  $assert?: boolean;
  /** timmer name */
  $timer?: string;
  /** preserve {} value by stringify */
  $preserve?: boolean;
}

export function isLogOptionExtra(e: unknown): e is LogOptionExtra {
  if (!isObject(e)) return false;
  const o = e as LogOptionExtra;
  return typeof o.$assert === 'boolean'
   || typeof o.$timer === 'string'
   || typeof o.$preserve === 'boolean';
}
