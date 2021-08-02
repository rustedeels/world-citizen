import { ModuleWithProviders, NgModule } from '@angular/core';

import { Prefix } from '../constants';
import { LogLevel } from './logger.model';
import { LoggerService } from './logger.service';

let logLevel = LogLevel.warning;
let force = false;

@NgModule()
export class LoggerModule {

  public constructor(logger: LoggerService) {
    const key = Prefix('LOGGER');
    let value = parseInt(localStorage.getItem(key) || 'NaN', 10);
    if (force || isNaN(value)) value = logLevel;
    localStorage.setItem(key, value.toString());
    logger.setLogLevel(value);
  }

  public static forLevel(level: LogLevel, force: boolean): ModuleWithProviders<LoggerModule>;
  public static forLevel(levele: number, force: boolean): ModuleWithProviders<LoggerModule>;
  public static forLevel(level: LogLevel): ModuleWithProviders<LoggerModule>;
  public static forLevel(levele: number): ModuleWithProviders<LoggerModule>;
  public static forLevel(l: number, force?: boolean): ModuleWithProviders<LoggerModule> {
    logLevel = l;
    force = !!force;
    return {
      ngModule: LoggerModule
    }
  }

}
