export type BatatasEvents = Extract<keyof BatatasEventsMap, string>;

export interface BatatasEventsMap {
  engineInit: never;
  newGameInit: never;
  gameInit: never;
}
