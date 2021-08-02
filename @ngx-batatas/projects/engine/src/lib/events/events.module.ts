import { CommonModule } from '@angular/common';
import {
    Inject, InjectionToken, Injector, ModuleWithProviders, NgModule, Optional, Provider, Self,
    SkipSelf, Type,
} from '@angular/core';

import { EVENTS_HANDLER, EventsInitializer, HANDLERS_INSTANCES } from './decorator';

const EVENTS_ROOT_GUARD = new InjectionToken<void>('EVENTS_ROOT_GUARD');

@NgModule({
  imports: [CommonModule]
})
export class EventsModule {

  constructor(
    @Optional() @Inject(EVENTS_ROOT_GUARD) _: any,
    @Optional() eventsInit: EventsInitializer,
    @Inject(HANDLERS_INSTANCES) handlers: any[][],
  ) {
    if (!eventsInit) return;
    eventsInit.initHandlers(handlers);
  }

  public static forHandlers(eventHandlers: Type<unknown>[]): ModuleWithProviders<EventsModule> {
    return {
      ngModule: EventsModule,
      providers: getEventsProviders(eventHandlers)
    }
  }

  public static forRoot(eventHandlers: Type<unknown>[]): ModuleWithProviders<EventsModule> {
    return {
      ngModule: EventsModule,
      providers: [
        EventsInitializer,
        getEventsProviders(eventHandlers),
        {
          provide: HANDLERS_INSTANCES,
          useFactory: initHandlers,
          multi: true,
          deps: [Injector, EVENTS_HANDLER]
        },
        {
          provide: EVENTS_ROOT_GUARD,
          useFactory: rootGuard,
          deps: [
            [EventsInitializer, new Optional(), new SkipSelf()],
            [HANDLERS_INSTANCES, new Self()]
          ]
        }
      ]
    }
  }
}

function getEventsProviders(eventHandlers: Type<unknown>[]): Provider[] {
  return [
    eventHandlers,
    {
      provide: EVENTS_HANDLER,
      useValue: eventHandlers,
      multi: true,
    }
  ]
}

function initHandlers(injector: Injector, handlers: Type<any>[][]) {
  return handlers.flatMap(e => e.map(i => injector.get<any>(i)));
}
function rootGuard(init: EventsInitializer, handlers: any[][]): string {
  if (init || handlers.length > 1) {
    throw new Error('EventsModule.forRoot(), called more than once');
  }
  return 'ok'
}
