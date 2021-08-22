import { Subscription } from 'rxjs';

import {
  Injectable,
  InjectionToken,
  OnDestroy,
  Type,
} from '@angular/core';

import { Prefix } from '../constants';
import { isObjectValue } from '../guards/object.guards';
import { LoggerService } from '../logger/logger.service';
import { BatatasEvents } from './batatas.events';
import { EventsService } from './events.service';

const TOKEN_PREFIX = '$##'
const HAS_INIT_TOKEN = '$BATATAS_EVENT_HAS_INIT';

function getEventToken(key: string): string {
  return `${TOKEN_PREFIX}${key}`;
}

function getEventName(token: string): string {
  const value = token.replace(TOKEN_PREFIX, '');
  if (value) return value;
  throw new Error(Prefix('EVENT_ERROR: parsing token for event handler'));
}

/** Handler for custom events */
export function EventHandler<T extends object>(key: Extract<keyof T, string>): MethodDecorator;
/** Handler for Batatas engine events */
export function EventHandler(key: BatatasEvents): MethodDecorator;
export function EventHandler(key: string): MethodDecorator {
  return function (target: Object, propKey: string | symbol, _: PropertyDescriptor) {
    const token = getEventToken(key);
    Object.defineProperty(
      target,
      token,
      {
        value: propKey
      }
    )
    Object.defineProperty(
      target,
      HAS_INIT_TOKEN,
      {
        value: true,
        writable: true,
      }
    )
  }
}

export const EVENTS_HANDLER = new InjectionToken<Type<any>[][]>('EVENTS_HANDLER');
export const HANDLERS_INSTANCES = new InjectionToken<any[][]>('HANDLERS_INSTANCES');

@Injectable()
export class EventsInitializer implements OnDestroy {
  private readonly subs: Subscription[] = [];

  constructor (
    private readonly _events: EventsService<any>,
    private readonly _logger: LoggerService,
  ) {}

  public ngOnDestroy(): void {
    for (const s of this.subs) {
      s?.unsubscribe();
    }
  }

  public initHandlers(handlers: any[][]): void {
    this._logger.engine('Init handlers:', handlers);
    for (let target of handlers.flatMap(e => e))
      this.initEventHandler(target);
  }

  private initEventHandler(target: any): void {
    this._logger.engine('Processing handler', target);

    if (!isObjectValue<any>(target) || !target[HAS_INIT_TOKEN]) {
      this._logger.engine('Handler is not a valid object, or was called 2 times');
      return;
    }

    target[HAS_INIT_TOKEN] = false;

    const proto = Object.getPrototypeOf(target);
    const props = Object.getOwnPropertyNames(proto);

    for (const token of props) {
      const eventName = getEventName(token);
      if (!eventName) continue;
      const propMethod = target[token];
      if (!propMethod) continue;
      const method = target[propMethod];
      if (typeof method !== 'function') continue;

      this._logger.engine('Init handler for event:', eventName)
      this.subs.push(this._events.subscribe(eventName, method.bind(target)));
    }
  }
}
