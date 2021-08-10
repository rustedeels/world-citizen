import { Injectable } from '@angular/core';
import { readTextFile } from '@tauri-apps/api/fs';

import { BaseEntityGenerator } from '../data-loader/base-entity-loader';
import { LoaderService } from '../data-loader/loader.service';
import { LoggerService } from '../logger/logger.service';
import { OSPathMapService } from '../system/path-map.service';
import { splitChapter } from './chapter-parser';
import {
    Chapter, ChapterAction, ChaptersGenerator, ChapterStoreName, Dialog, DialogText, Media,
    NextChapter, PartyMember,
} from './chapter.model';
import { ChapterStore } from './chapter.store';

interface RawChapter {
  name: string;
  bool: string;
  party: RawProperty[];
  dialog: RawDialog[];
  media: RawProperty[];
  actions: RawProperty[];
  next: RawProperty[];
}

interface RawDialog {
  name: string;
  character: number;
  media: RawProperty[];
  bool: string;
  text: RawTextDialog[];
}

interface RawTextDialog {
  text: string;
  media: RawProperty[];
  bool: string;
}

interface RawProperty {
  name: string;
  props: string;
  bool: string;
}

@Injectable({ providedIn: 'platform' })
export class ChapterLoaders extends BaseEntityGenerator<Chapter, ChaptersGenerator> {

  public constructor(
    logger: LoggerService,
    store: ChapterStore,
    loader: LoaderService,
    private readonly _pathMap: OSPathMapService,
  ) {
    super(logger, store);
    loader.addLoader(ChapterStoreName, this);
    _pathMap.refresh();
  }

  protected async generate(item: ChaptersGenerator): Promise<Chapter[]> {
    const res: Chapter[] = [];

    for (const path of item.chapters) {
      const filePath = this._pathMap.resolveCurrentDir(path);
      const content = await readTextFile(filePath);
      res.push(...this.parse(content, item));
    }

    return res;
  }

  protected parse(
    content: string,
    src: ChaptersGenerator,
  ): Chapter[] {
    return splitChapter(content, src.id)
      .map(e => this.mapToChapter(e, src));
  }

  private  mapToChapter(r: RawChapter, src: ChaptersGenerator): Chapter {
    return {
      id: r.name,
      name: r.name,
      bool: r.bool,
      actions: r.actions.map(this.mapToAction),
      next: r.next.map(e => this.mapToNext(e, src.id)),
      party: r.party.map(e => this.mapToParty(e, src.charMap)),
      media: r.media.map(e => this.mapToMedia(e, src.resMap)),
      dialogs: r.dialog.map(e => this.mapToDialog(e, src.resMap)),
    }
  }

  private mapToDialog(r: RawDialog, map: { [key: string]: string }): Dialog {
    return {
      id: r.name,
      name: r.name,
      bool: r.bool,
      party: r.character,
      media: r.media.map(e => this.mapToMedia(e, map)),
      text: r.text.map(e => this.mapToDialogText(e, map)),
    }
  }

  private mapToDialogText(r: RawTextDialog, map: { [key: string]: string }): DialogText {
    return {
      bool: r.bool,
      text: r.text,
      media: r.media.map(e => this.mapToMedia(e, map)),
    }
  }

  private mapToAction(r: RawProperty): ChapterAction {
    return {
      bool: r.bool,
      event: r.name,
      params: r.props
    }
  }

  private mapToNext(r: RawProperty, prefix: string): NextChapter {
    return {
      bool: r.bool,
      id: `${prefix}/${r.name}`,
      text: r.name,
    }
  }

  private mapToMedia(r: RawProperty, map: { [key: string]: string }): Media {
    const name = r.name;
    const loop = r.props.indexOf('LOOP') !== -1;
    const end = r.props.indexOf('INF') !== -1;

    if (this.isEvalName(name)) {
      return {
        loader: name.substring(1, name.lastIndexOf('`')),
        bool: r.bool,
        loop,
        end
      }
    } else {
      const id = map[name];
      if (!id) this._logger.warning('Char not found for name:', name);
      return {
        id: id ?? name,
        bool: r.bool,
        loop,
        end
      }
    }
  }

  private mapToParty(r: RawProperty, map: { [key: string]: string }): PartyMember {
    const name = r.name;
    if (this.isEvalName(name)) {
      return {
        loader: name.substring(1, name.lastIndexOf('`')),
        bool: r.bool,
      }
    } else {
      const id = map[name];
      if (!id) this._logger.warning('Char not found for name:', name);
      return {
        id: id ?? name,
        bool: r.bool
      }
    }
  }

  private isEvalName(s: string): boolean {
    return s.indexOf('`') === 0
      && s.lastIndexOf('`') === s.length - 1;
  }
}
