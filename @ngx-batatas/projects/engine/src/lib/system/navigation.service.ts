import { Injectable } from '@angular/core';

import { ChapterQuery } from '../chapter';
import { ChapterStore } from '../chapter/chapter.store';
import { LoggerService } from '../logger';
import { ServiceReset } from '../shared/service.model';
import { GameEngineStateMachine } from '../states/game-engine.state';
import { ResetService } from './reset.service';

@Injectable({ providedIn: 'platform' })
export class NavigationService implements ServiceReset {

  public constructor(
    private readonly _chapterStore: ChapterStore,
    private readonly _chapterQuery: ChapterQuery,
    private readonly _gameEngineState: GameEngineStateMachine,
    private readonly _logger: LoggerService,
    reset: ResetService,
  ) { reset.register(this); }

  public async reset(): Promise<void> {
    this._chapterStore.setActive(null);
    this._gameEngineState.nextState('waiting');
  }

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
