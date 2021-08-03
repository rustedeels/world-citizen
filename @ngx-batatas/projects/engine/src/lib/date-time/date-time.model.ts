export const DateTimeStoreName = '$dateTime'

export type DateTimeEvents = keyof DateTimeEventsMap;

export interface DateTimeEventsMap {
  advanceTime: number,
  advance15minutes: never,
  advance1hour: never,
}

export interface DateTimeState {
  day: number,
  month: number,
  year: number,
  hour: number,
  minute: number,
}
