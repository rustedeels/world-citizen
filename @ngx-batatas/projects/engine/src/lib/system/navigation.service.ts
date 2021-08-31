import { Injectable } from '@angular/core';

import { ChapterQuery } from '../chapter';
import { ChapterStore } from '../chapter/chapter.store';
import { LoggerService } from '../logger';
import { GameEngineStateMachine } from '../states/game-engine.state';

@Injectable({ providedIn: 'platform' })
export class NavigationService {

  public constructor(
    private readonly _chapterStore: ChapterStore,
    private readonly _chapterQuery: ChapterQuery,
    private readonly _gameEngineState: GameEngineStateMachine,
    private readonly _logger: LoggerService,
  ) {}

  public goToChapter(id: string, prefix: string | undefined): boolean {
    if (prefix) id = `${prefix}=>${id}`;
    const chapter = this._chapterQuery.getEntity(id);
    if (!chapter) {
      this._logger.warning('Can\'t find chapter id', id);
      return false;
    }

    this._chapterStore.setActive(id);
    this._gameEngineState.nextState('chapter');

    return true;
  }
}
