import { CharInit } from '../char/char.model';

export type BatatasEvents = Extract<keyof BatatasEventsMap, string>;

export interface BatatasEventsMap {
  /** Engine has started */
  engineInit: never;
  /** A new game was started */
  newGameInit: never;
  /** A game was loaded */
  gameLoaded: never;
  /** A new character was added */
  charInit: CharInit
}
