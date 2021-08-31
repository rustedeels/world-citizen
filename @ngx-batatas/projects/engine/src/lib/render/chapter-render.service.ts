import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import {
  Chapter,
  Dialog,
  DialogText,
  Media,
  MediaStatic,
  PartyMember,
  PartyMemberStatic,
} from '../chapter/chapter.model';
import { ChapterQuery } from '../chapter/chapter.query';
import {
  Char,
  PLAYER_ID,
} from '../char/char.model';
import { CharQuery } from '../char/char.query';
import { BoolEvaluatorService } from '../evaluator/bool-evaluator.service';
import { EvaluatorService } from '../evaluator/evaluator.service';
import { LoggerService } from '../logger/logger.service';
import { ResourcesQuery } from '../resources/resources.query';
import { SubscriberManager } from '../tools/rxjs.tools';
import {
  ChapterRender,
  createInitialState,
  MediaMap,
  MediaResource,
} from './render.model';
import { RenderQuery } from './render.query';
import { RenderStore } from './render.store';

type SubNames = 'chapter' | 'char' | 'dialog' | 'dialogText'

@Injectable({ providedIn: 'platform' })
export class ChapterRenderService {
  private readonly _subs = new SubscriberManager<SubNames>();

  private _dialogs: Dialog[] = [];
  private _texts: DialogText[] = [];
  private _chars: string[] = [];

  public constructor(
    private readonly _logger: LoggerService,
    private readonly _chapterQuery: ChapterQuery,
    private readonly _resQuery: ResourcesQuery,
    private readonly _charQuery: CharQuery,
    private readonly _renderStore: RenderStore,
    private readonly _renderQuery: RenderQuery,
    private readonly _evalService: EvaluatorService,
    private readonly _boolEval: BoolEvaluatorService,
  ) {}

  public goNext(): boolean {
    const diagIndex = this._renderQuery.getValue().chapter.dialogIndex;
    const textIndex = this._renderQuery.getValue().chapter.textIndex;

    if (diagIndex < 0 || textIndex < 0) {
      this._renderStore.updateChapter({ dialogIndex: 0, textIndex: 0 });
      return true;
    }

    if (textIndex < this._texts.length - 1) {
      this._renderStore.updateChapter({ textIndex: textIndex + 1 });
      return true;
    }

    if (diagIndex < this._dialogs.length -1) {
      this._subs.clear('dialogText');
      this._renderStore.updateChapter({ dialogIndex: diagIndex + 1 });
      return true;
    }

    return false;
  }

  public goPrev(): boolean {
    const diagIndex = this._renderQuery.getValue().chapter.dialogIndex;
    const textIndex = this._renderQuery.getValue().chapter.textIndex;

    if (textIndex > 0) {
      this._renderStore.updateChapter({ textIndex: textIndex - 1 });
      return true;
    }

    if (diagIndex > 0) {
      this._subs.clear('dialogText');
      this._renderStore.updateChapter({ dialogIndex: diagIndex - 1 });
      return true;
    }

    return false;
  }

  public async renderChapter(id: string): Promise<void> {
    this._subs.clear();
    const chapter = this._chapterQuery.getEntity(id);
    if (!chapter) { this._logger.warning('Chapter id not found', id); }
    this.loadChapter(chapter);
  }

  public async loadChapter(c?: Chapter) {
    if (!c) {
      this._dialogs = [];
      this._texts = [];
      this._chars = [];
      return;
    };

    this._logger.engine('Loading chapter to render', c.id);
    this._renderStore.goToChapter(this.buildInitialChapterRender(c));

    this._chars = await this.loadChapterParty(c);
    this._logger.engine('Loaded characters', this._chars);

    await this.loadMedia('chapter', c.media);

    this._dialogs = await this._boolEval.filterValues(c.dialogs);
    this._logger.engine('Loaded dialogs', this._dialogs);

    this.subscribeDialog();
    this.goNext();
  }

  private buildInitialChapterRender(c: Chapter): ChapterRender {
    return {
      ...createInitialState().chapter,
      id: c.id,
    };
  }

  // ------------------ dialog ------------------------------
  private subscribeDialog() {
    this._subs.subscribe(
      'dialog',
      this._renderQuery.select(s => s.chapter.dialogIndex)
        .pipe(tap(d => this.loadDialog(d))),
    );
  }

  private async loadDialog(index: number): Promise<void> {
    const d = this._dialogs[index];
    if (!d) return;

    const charId = this._chars[d.party];

    if (charId) this.subscribeCharId(charId);
    else this._logger.warning('No char defined for index', d);

    await this.loadMedia('dialog', d.media);

    this._texts = await this._boolEval.filterValues(d.text);
    this.subscribeDialogText();
  }
  // ------------------ dialog ------------------------------

  // ------------------ text --------------------------------
  private subscribeDialogText() {
    this._subs.subscribe(
      'dialogText',
      this._renderQuery.select(s => s.chapter.textIndex)
        .pipe(tap(d => this.setText(d)))
    );
  }

  private setText(index: number): void {
    const d = this._texts[index];
    this._renderStore.updateChapter({ dialogText: d?.text ?? '' });
    if (d) { this.loadMedia('text', d.media); }
  }
  // ------------------ text --------------------------------

  // --------------- character ------------------------------
  private async loadChapterParty(c: Chapter): Promise<string[]> {
    var party = await this._boolEval.filterValues(c.party);

    const res = [PLAYER_ID];

    if (!party.length) return res;

    for (const p of party) {
      if (this.isStaticMember(p)) {
        res.push(p.id);
        continue;
      }

      try {
        const id = await this._evalService.evaluateAsync(p.loader);

        if (typeof id !== 'string') throw new Error('Char loader returned an invalid id: ' + id);

        if (id) res.push(id);
      } catch (err) {
        this._logger.error('Error evaluating party member', p, err);
      }
    }

    return res;
  }

  private subscribeCharId(charId: string): void {
    this._subs.subscribe(
      'char',
      this._charQuery.selectEntity(charId)
        .pipe(tap(c => this.updateChar(c))),
      charId
    );
  }

  private updateChar(char?: Char): void {
    if (!char) return;
    this.setCharacterName(char)
  }

  private setCharacterName(c: Char): void {
    const charName = c.surname ? `${c.name} ${c.surname}` : c.name
    this._renderStore.updateChapter({
      charName,
      charId: c.id,
      charPortaitPath: c.portrait,
    });
  }

  private isStaticMember(c: PartyMember): c is PartyMemberStatic {
    return !!(c as PartyMemberStatic).id
  }
  // --------------- character ------------------------------

  // ------------------- Media ------------------------------
  private async loadMedia(type: keyof MediaMap, values: Media[]): Promise<void> {
    const validMedia = await this._boolEval.filterValues(values);

    const media: MediaResource[] = [];

    const pushMedia = (id: string, attr: string[]) => {
      const v = this._resQuery.getEntity(id);

      if (!v) {
        this._logger.warning('Id not found for resource', id);
        return;
      }

      media.push({
        attr,
        path: v.path,
        type: v.type
      });
    };

    for (const m of validMedia) {
      if (this.isStaticMedia(m)) {
        pushMedia(m.id, m.attr);
        continue;
      }

      try {
        const id = await this._evalService.evaluateAsync(m.loader);

        if (typeof id !== 'string') throw new Error('Char loader returned an invalid id: ' + id);

        pushMedia(id, m.attr);
      } catch (err) {
        this._logger.error('Error evaluating media', m);
      }
    }

    this._renderStore.updateChapterMedia({ [type]: media });
  }

  private isStaticMedia(m: Media): m is MediaStatic {
    return !!(m as MediaStatic).id;
  }
  // ------------------- Media ------------------------------
}
