import { Injectable } from '@angular/core';

import {
  isLogOptionExtra,
  LogLevel,
  LogOption,
  LogOptionExtra,
} from './logger.model';

@Injectable({ providedIn: 'platform'})
export class LoggerService {
  public logLevel: number = LogLevel.all;

  constructor() {}

  public setLogLevel(v: number): void {
    this.logLevel = v;
  }

  public startTimer(): string {
    const name = `Timer[${Math.random().toString()}]`;
    console.time(name);
    return name;
  }

  public stopTimer(v: string) {
    console.timeEnd(v);
  }

  public error(message: string, extra: LogOptionExtra, ...params: any[]): void;
  public error(message: string, ...params: any[]): void;
  public error(message: string, ...restParams: any[]): void {
    this.LogOption(LogLevel.error, message, ...restParams);
  }

  public warning(message: string, extra: LogOptionExtra, ...params: any[]): void;
  public warning(message: string, ...params: any[]): void;
  public warning(message: string, ...restParams: any[]): void {
    this.LogOption(LogLevel.warning, message, ...restParams);
  }

  public info(message: string, extra: LogOptionExtra, ...params: any[]): void;
  public info(message: string, ...params: any[]): void;
  public info(message: string, ...restParams: any[]): void {
    this.LogOption(LogLevel.info, message, ...restParams);
  }

  public debug(message: string, extra: LogOptionExtra, ...params: any[]): void;
  public debug(message: string, ...params: any[]): void;
  public debug(message: string, ...restParams: any[]): void {
    this.LogOption(LogLevel.debug, message, ...restParams);
  }

  public engine(message: string, extra: LogOptionExtra, ...params: any[]): void;
  public engine(message: string, ...params: any[]): void;
  public engine(message: string, ...restParams: any[]): void {
    const msg = `[BATATAS] ${message}`;
    this.LogOption(LogLevel.engine, msg, ...restParams);
  }

  public LOG(opt: LogOption): void {
    if (opt.assert || opt.level > this.logLevel) return;

    // stop timer
    if(opt.timer) this.stopTimer(opt.timer);

    let params = [];

    if (opt.preserve) {
      for (const p of (opt.params ?? []))
        params.push(JSON.parse(JSON.stringify(p)));
    } else {
      params = opt?.params ?? [];
    }

    const l = opt.level;
    if (l <= LogLevel.error) {
      console.error(opt.message, ...params);
    } else if (l <= LogLevel.warning) {
      console.warn(opt.message, ...params);
    } else if (l <= LogLevel.info) {
      console.info(opt.message, ...params);
    } else if (l <= LogLevel.debug) {
      console.debug(opt.message, ...params);
    } else if (l <= LogLevel.engine) {
      console.debug(opt.message, ...params);
    } else {
      console.log(opt.message, ...params);
    }
  }

  private LogOption(level: number, message: string, ...restParams: any[]): void {
    if (level > this.logLevel) return;

    const o: LogOption = {
      level,
      message,
      params: restParams,
    };

    const op = restParams[0];
    if (isLogOptionExtra(op)) {
      o.params = restParams.slice(1);
      o.timer = op.$timer;
      o.assert = op.$assert;
      o.preserve = op.$preserve;
    }

    this.LOG(o);
  }
}
