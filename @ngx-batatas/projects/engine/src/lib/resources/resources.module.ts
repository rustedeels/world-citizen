import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { RESOURCES_TO_LOAD, ResourcesLoader } from './resource.loader';
import { Resource } from './resources.model';

@NgModule()
export class ResourcesModule {
  public static forResource(res: Resource[]): ModuleWithProviders<ResourcesModule> {
    return {
      ngModule: ResourcesModule,
      providers: [{
        provide: RESOURCES_TO_LOAD,
        useValue: res,
        multi: true,
      }]
    }
  }

  public static forRoot(): ModuleWithProviders<ResourcesModule> {
    return {
      ngModule: ResourcesModule,
      providers: [{
        provide: APP_INITIALIZER,
        useFactory: addResources,
        deps: [ResourcesLoader, [RESOURCES_TO_LOAD, new Optional()]],
        multi: true,
      }]
    }
  }
}

function addResources(loader: ResourcesLoader, res: Resource[][]) {
  return () => {
    if (!res || !res.length) return;
    loader.addUnique(...res.flatMap(e => e));
  }
}
