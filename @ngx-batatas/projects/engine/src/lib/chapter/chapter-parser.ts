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

let p = (s: string) => s;

/** Split chapters regions */
export function splitChapter(str: string, prefix: string = ''): RawChapter[] {
  if (prefix) p = (s: string) => `${prefix}/${s}`;
  else p = (s: string) => s;

  return splitByMatch(str, /^#\s/gm)
    .map(e => parseRawChapter(e))
}

function parseRawChapter(raw: string): RawChapter {
  const [chapter, dialogs] = splitChapterDialog(raw);
  const [name, party] = parseChapterNameParty(chapter);

  return {
    name: p(name),
    party,
    bool: parseRawBool(chapter),
    actions: parseEvent(chapter),
    media: parseMedia(chapter),
    next: parseNext(chapter),
    dialog: splitDialogs(dialogs),
  }
}

function splitDialogs(raw: string): RawDialog[] {
  return splitByMatch(raw, /^##\s/gm)
    .map(e => parseRawDialog(e));
}

function parseRawDialog(raw: string): RawDialog {
  const [dialog, texts] = splitDialogText(raw);
  const [name, character] = parseDialogNameAndChar(dialog);

  return {
    name: p(name),
    character,
    bool: parseRawBool(dialog),
    media: parseMedia(dialog),
    text: getDialogTexts(texts),
  }
}

function splitDialogText(raw: string): [string, string] {
  const match = raw.search(/^\*\s/gm);
  if (match === -1) return [raw, ''];
  return [raw.substring(0, match), raw.substring(match)];
}

function getDialogTexts(raw: string): RawTextDialog[] {
  return splitByMatch(raw, /^\*\s/gm)
    .map(e => parseDialogText(e));
}

function parseDialogText(raw: string): RawTextDialog {
  return {
    text: Match.n(raw, /^\*\s(.*)/gm).group(1) ?? '',
    bool: parseRawBool(raw),
    media: parseMedia(raw),
  }
}

/** Chapter properties and raw dialog */
function splitChapterDialog(raw: string): [string, string] {
  const i = raw.search(/^##\s/gm);

  if (i === -1) return [raw, ''];

  return [raw.substring(0, i), raw.substring(i)]
}

function parseRawBool(str: string): string {
  return Match.n(str.trim(), /^\>\!(.*)/gm).group(1) ?? '';
}

function parseMedia(s: string): RawProperty[] {
  return parsePropList(s.trim(), /^\>\>(.*)/gm)
}

function parseEvent(s: string): RawProperty[] {
  return parsePropList(s.trim(), /^\>\$(.*)/gm)
}

function parseNext(s: string): RawProperty[] {
  return parsePropList(s.trim(), /^\>\#(.*)/gm)
}

function parseDialogNameAndChar(raw: string): [string, number] {
  const m = groupMatch(raw, /^##\s(.*)\|(.*)|^##\s(.*)/gm);
  if (!m) return ['', -1];
  const name = m[1] ?? m[3] ?? '';
  const char = parseInt(m[2] ?? '-1', 10);
  return [name, char];
}

function parseChapterNameParty(raw: string): [string, RawProperty[]] {
  const m = Match.n(raw, /^#\s(.*)\|(.*)|^#\s(.*)/gm)

  const name = m.group(1) ?? m.group(3) ?? '';
  const char = (m.group(2) ?? '')
    .split(',')
    .filter(e => !!e)
    .map(parseProp);

  return [name, char];
}

function splitByMatch(str: string, reg: RegExp): string[] {
  const res: string[] = [];

  while (true) {
    const i = str.search(reg);
    if (i === -1) break;

    str = str.substring(i);

    const i2 = str.substring(1).search(reg);
    if (i2 === -1) {
      res.push(str);
      break;
    }

    res.push(str.substring(0, i2 + 1));
    str = str.substring(i2 + 1);
  }

  return res;
}

function groupMatch(raw: string, reg: RegExp) {
  const all = raw.matchAll(reg);
  for (const m of all) return m;
  return;
}

function parsePropList(s: string, exp: RegExp): RawProperty[] {
  return Match.n(s, exp).groups(1).map(e => parseProp(e));
}

function parseProp(s: string): RawProperty {
  const m = Match.n(s.trim(), /^(.*?)\[(.*)\]\((.*)\)|^(.*?)\[(.*)\]|^(.*?)\((.*)\)|^(.*)/gm);
  return {
    name: m.group(1) ?? m.group(4) ?? m.group(6) ?? m.group(8) ?? '',
    props: m.group(2) ?? m.group(5) ?? '',
    bool: m.group(3) ?? m.group(7) ?? '',
  }
}

class Match {
  public readonly matchs: RegExpMatchArray[];

  public constructor(
    text: string,
    exp: RegExp
  ) {
    this.matchs = [];
    for(const m of text.matchAll(exp))
      this.matchs.push(m)
  }

  public group(index: number): string | undefined {
    const first = this.matchs[0];
    if (first) return first[index];
    return;
  }

  public groups(index: number): string[] {
    return this.matchs.map(e => e[index])
      .filter(e => typeof e !== 'undefined');
  }

  public static n(text: string, exp: RegExp): Match {
    return new Match(text, exp);
  }
}
