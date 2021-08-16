import { RawChapter, RawDialog, RawProperty, RawTextDialog } from './core/models/chapter.model.ts';
import { prefix as P } from './core/tools/prefix.tool.ts';
import { MultiToken } from './models.ts';
import { BOOL, CHAPTER, DIALOG, DIALOG_TEXT, EVENT, MEDIA, NEXT, SECTION_REGEX } from './tokens.ts';
import { extractProp, extractToken, matchSingle, regexSplit } from './tools.ts';

/**
 * Parse chapter files and return its object
 * @param sources text sources to parse
 * @returns 
 */
export function parseChapters(sources: string[]): RawChapter[] {
  return sources.flatMap(e => parseRawChapters(e));
}

function parseRawChapters(src: string): RawChapter[] {
  const parts = regexSplit(src, CHAPTER.regex);
  if (!parts.length) return [];
  if (parts.length === 1) return parts.map(e => parseRawChapter(e, ''))

  const prefix = parts[0]?.trim() ?? '';
  return parts.slice(1).map(e => parseRawChapter(e, prefix));
}

function parseRawChapter(src: string, prefix: string): RawChapter {
  const [chapter, ...dialogs] = regexSplit(src, DIALOG.regex);
  if (!chapter) throw new Error('Chapter not defined for: ' + src);
  const [name, party] = parseChapterNameParty(
    extractToken(chapter, CHAPTER), prefix);

  return {
    name,
    party,
    bool: extractToken(chapter, BOOL),
    actions: multiProp(chapter, EVENT),
    media: multiProp(chapter, MEDIA),
    next: multiProp(chapter, NEXT),
    dialog: dialogs.map(e => parseDialog(e, prefix))
  }
}

function parseChapterNameParty(raw: string, prefix: string): [string, RawProperty[]] {
  const m = matchSingle(raw, SECTION_REGEX);
  if (!m) throw new Error('Error parsing chapter title')

  const name = m[1] ?? m[3] ?? '';
  const char = (m[2] ?? '')
    .split(',')
    .filter(e => !!e)
    .map(extractProp);

  return [P(name, prefix), char];
}

function parseDialog(src: string, prefix: string): RawDialog {
  const [dialog, ...texts] = regexSplit(src, DIALOG_TEXT.regex);
  if (!dialog) throw new Error('Dialog not defined for: ' + src);
  const [name, character] = parseDialogChar(extractToken(dialog, DIALOG), prefix);

  return {
    name,
    character,
    bool: extractToken(dialog, BOOL),
    media: multiProp(dialog, MEDIA),
    text: texts.map(parseDialogText),
  }
}

function parseDialogChar(raw: string, prefix: string): [string, number] {
  const m = matchSingle(raw, SECTION_REGEX);
  if (!m) throw new Error('Error parsing dialog title')

  const name = m[1] ?? m[3] ?? '';
  const char = parseInt(m[2] ?? '', 10);
  return [P(name, prefix), isNaN(char) ? 0 : char];
}

function parseDialogText(src: string): RawTextDialog {
  return {
    text: extractToken(src, DIALOG_TEXT),
    bool: extractToken(src, BOOL),
    media: multiProp(src, MEDIA)
  }
}

const multiProp = (src: string, token: MultiToken)=>
  extractToken(src, token).map(e => extractProp(e));