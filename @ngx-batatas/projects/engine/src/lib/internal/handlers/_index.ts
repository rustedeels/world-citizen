import { Type } from '@angular/core';

import { CharEventsHandler } from './char.handler';
import { DateTimeHandlers } from './date-time.handler';

export const INTERNAL_HANDLERS: Type<any>[] = [
  CharEventsHandler,
  DateTimeHandlers,
]
