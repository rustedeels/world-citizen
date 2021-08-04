import { Injectable, InjectionToken } from '@angular/core';

import { EventsService } from '../events/events.service';
import { LoggerService } from '../logger/logger.service';
import { OSPathMapService } from '../system/path-map.service';
import { Resource, ResourceEventsMap } from './resources.model';
import { ResourcesStore } from './resources.store';

export const RESOURCES_TO_LOAD = new InjectionToken<Resource[][]>('RESOURCES_TO_LOAD');

@Injectable({ providedIn: 'platform' })
export class ResourcesLoader {

  private readonly _res = new Map<string, Resource>();

  public constructor(
    private readonly _logger: LoggerService,
    private readonly _store: ResourcesStore,
    private readonly _pathMap: OSPathMapService,
    private readonly _events: EventsService<ResourceEventsMap>,
  ) { }

  public add(...res: Resource[]): void {
    this._logger.engine('Adding resources ' + res.length);
    for (const r of res) {
      if (this._res.has(r.id)) {
        this._logger.warning(`${r.id} is alreay in loading queue`);
        continue;
      }

      this._res.set(r.id, r);
    }
  }

  public async load(): Promise<void> {
    // preload
    const values = this.preloadValues();
    this._events.emit('resourcesLoadingStart');
    this._logger.engine(`Loading ${values.length} values`);

    for (const v of values)
      await this.addToStore(v);
    this._events.emit('resourcesLodingComplete');
  }

  private async addToStore(r: Resource): Promise<void> {
    try {
      const path = this._pathMap.resolveCurrentDir(r.path);
      this._store.upsert(r.id, {
        ...r,
        path,
      });
    } catch (err) {
      this._logger.error('Error adding resource', {
        $preserve: true
      }, r, err)
    }
  }

  // Preload values and free current queue
  private preloadValues(): Resource[] {
    const values: Resource[] = [];
    for (const r of this._res.values()) {
      values.push(r);
    }
    this._res.clear();
    return values;
  }

}
