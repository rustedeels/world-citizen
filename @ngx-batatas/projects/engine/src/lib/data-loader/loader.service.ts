import { Injectable } from '@angular/core';

import { LoggerService } from '../logger';
import { InitService } from '../system/init.service';
import { BaseLoader } from './base-loader';
import { ProgressReport } from './progress-report';

@Injectable({ providedIn: 'platform' })
export class LoaderService {
  private readonly _loaders = new Map<string, BaseLoader<any>>();

  public constructor(
    private readonly _logger: LoggerService,
    private readonly _init: InitService,
  ) {}

  public addLoader(name: string, loader: BaseLoader<any>): void {
    this._loaders.set(name, loader);
    this._logger.engine('Registering loader: ' + name);
  }

  public async load(progress?: ProgressReport): Promise<void> {
    var report = progress ?? new ProgressReport();
    // Preload
    for (const l of this._loaders.values()) { l.preload(report); }

    let last = 0;
    report.progress$.subscribe(e => {
      if (e.progress === last) return;
      last = e.progress;
      this._logger.engine(`Loading engine (${e.progress}%): ${e.current}/${e.total}`);
    })

    for (const [name, l] of this._loaders.entries()) {
      this._logger.engine('Loading for ' + name);
      await l.load(report);
    }

    await this._init.init();
  }
}
