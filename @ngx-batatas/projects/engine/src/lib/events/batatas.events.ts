import { CharInit } from '../char/char.model';
import { ShowCustomView } from '../custom-view/custom-view.model';

export type BatatasEvents = Extract<keyof BatatasEventsMap, string>;

export interface BatatasEventsMap {
  /** Engine has started */
  engineInit: never;
  /** Engine is ready to start a game */
  engineReady: never;
  /** A new game was started */
  newGameInit: never;
  /** A game was loaded */
  gameLoaded: never;
  /** A new character was added */
  charInit: CharInit | CharInit[];
  /** Show/Hide pause menu */
  togglePauseMenu: never;

  /** If in chapter state, go to next state */
  chapterGoNext: never;

  /** Show a custom view */
  goToCustomView: ShowCustomView<any>
}
