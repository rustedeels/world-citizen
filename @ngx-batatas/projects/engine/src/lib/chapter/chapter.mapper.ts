import { LoggerService } from '../logger';
import {
  RawChapter,
  RawDialog,
  RawProperty,
  RawTextDialog,
} from '../parser/parser.model';
import { StringMap } from '../shared/utils.model';
import {
  isPrefix,
  prefix,
  splitPrefix,
} from '../tools/prefix.tool';
import {
  Chapter,
  ChapterAction,
  Dialog,
  DialogText,
  Media,
  NextChapter,
  PartyMember,
} from './chapter.model';

export function mapRawChapters(
  raw: RawChapter[],
  charMap: StringMap<string>,
  resMap: StringMap<string>,
  logger: LoggerService,
): Chapter[] {
  try {
    return raw.map(e => mapToChapter(e, charMap, resMap, logger));
  } catch (err) {
    logger.error('Error parsing chapter content', err);
    return [];
  }
}

function mapToChapter(
  raw: RawChapter,
  charMap: StringMap<string>,
  resMap: StringMap<string>,
  logger: LoggerService
): Chapter {
  const party = mapCharacters(raw.party, charMap, logger);
  const [_, prefix] = splitPrefix(raw.name);

  if (!prefix) {
    throw new Error('Prefix must be defined for chater: ' + raw.name);
  }

  return {
    id: raw.name,
    name: raw.name,
    timeout: raw.timeout,
    actions: mapActions(raw.actions),
    media: mapMedia(raw.media, resMap, logger),
    next: mapNext(raw.next, prefix),
    dialogs: mapDialogs(raw.dialog, resMap, logger),
    bool: raw.bool,
    party,
  }
}

function mapActions(raw: RawProperty[]): ChapterAction[] {
  return raw.map(e => ({
    event: e.name,
    bool: e.bool,
    params: e.props,
  }))
}

function mapMedia(raw: RawProperty[], res: StringMap<string>, logger: LoggerService): Media[] {
  const result: Media[] = [];

  for (const m of raw) {
    const attr = m.props.split('|');

    if (isEvalName(m.name)) {
      result.push({
        attr,
        loader: m.name,
        bool: m.bool
      });
      continue;
    }

    const id = m.name[0] === '#' ? m.name.substring(1) : res[m.name];
    if (!id) {
      logger.warning('Cannot find resource for name:', m.name);
      continue;
    }

    result.push({
      bool: m.bool,
      attr,
      id,
    });
  }

  return result;
}

function mapCharacters(
  chars: RawProperty[],
  charMap: StringMap<string>,
  logger: LoggerService
): PartyMember[] {
  let errors = 0;
  const result: PartyMember[] = [];

  for (const p of chars) {
    if (isEvalName(p.name)) {
      result.push({
        loader: p.name,
        bool: p.bool
      });
      continue;
    }

    const id = p.name[0] === '#' ? p.name.substring(1) : charMap[p.name];
    if (!id) {
      logger.warning('Cannot find character for name:', p.name);
      errors++;
      continue;
    }

    result.push({
      id,
      bool: p.bool
    });
  }

  if (errors) {
    throw new Error('Error finding party members');
  }

  return result;
}

function mapNext(raw: RawProperty[], pre: string): NextChapter[] {
  return raw.map(e => ({
    text: e.name,
    bool: e.bool,
    id: isPrefix(e.props) ? e.props : prefix(e.props, pre),
  }));
}

function mapDialogs(
  raw: RawDialog[],
  res: StringMap<string>,
  logger: LoggerService
): Dialog[] {
  const diags: Dialog[] = [];

  for (const d of raw) {
    const media = mapMedia(d.media, res, logger);
    const text = mapTexts(d.text, res, logger);

    diags.push({
      id: d.name,
      name: d.name,
      bool: d.bool,
      party: d.character,
      media,
      text
    })
  }

  return diags;
}

function mapTexts(
  raw: RawTextDialog[],
  res: StringMap<string>,
  logger: LoggerService
): DialogText[] {
  return raw.map(t => ({
    media: mapMedia(t.media, res, logger),
    bool: t.bool,
    text: t.text,
  }))
}

function isEvalName(s: string): boolean {
  return s.indexOf('`') === 0
    && s.lastIndexOf('`') === s.length - 1;
}
