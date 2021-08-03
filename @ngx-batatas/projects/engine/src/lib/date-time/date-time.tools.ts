import { DateTimeState } from './date-time.model';

export function dateTimeFromState(e: DateTimeState): Date {
  return new Date(e.year, e.month, e.day, e.hour, e.minute, 0, 0);
}

export function stateFromDateTime(e: Date): DateTimeState {
  return {
    day: e.getDate(),
    hour: e.getHours(),
    minute: e.getMinutes(),
    month: e.getMonth(),
    year: e.getFullYear()
  }
}
