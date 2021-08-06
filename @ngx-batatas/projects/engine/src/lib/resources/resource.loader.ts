import { Injectable, InjectionToken } from '@angular/core';

import { BaseEntityLoader } from '../data-loader/base-entity-loader';
import { LoaderService } from '../data-loader/loader.service';
import { LoggerService } from '../logger/logger.service';
import { OSPathMapService } from '../system/path-map.service';
import { buildPath } from '../tools/path.tools';
import { Resource, ResourceStoreName } from './resources.model';
import { ResourcesStore } from './resources.store';

export const RESOURCES_TO_LOAD = new InjectionToken<Resource[][]>('RESOURCES_TO_LOAD');

@Injectable({ providedIn: 'platform' })
export class ResourcesLoader extends BaseEntityLoader<Resource> {

  public constructor(
    logger: LoggerService,
    store: ResourcesStore,
    private readonly _pathMap: OSPathMapService,
    loader: LoaderService,
  ) {
    super(logger, store);
    loader.addLoader(ResourceStoreName, this);
  }

  protected async beforeInsert(item: Resource): Promise<Resource> {
    const path = this._pathMap.resolveCurrentDir(
      buildPath('/assets/resources', item.path));
    return {
      ...item,
      path,
    };
  }
}
