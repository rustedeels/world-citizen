interface RawChapter {
  name: string;
  bool: string;
  party: string[];
  dialog: string[];
  media: string[];
  actions: string[];
  next: string[];
}

/** Split chapters regions */
export function splitChapter(str: string): RawChapter[] {
  const res: string[] = [];

  while (true) {
    const i = str.search(/^#\s/gm);
    if (i === -1) break;

    str = str.substring(i);

    const i2 = str.substring(1).search(/^#\s/gm);
    if (i2 === -1) {
      res.push(str);
      break;
    }

    res.push(str.substring(0, i2 + 1));
    str = str.substring(i2 + 1);
  }

  return res.map(e => parseRawChapter(e));
}

function parseRawChapter(raw: string): RawChapter {
  const [chapter, _] = splitChapterDialog(raw);

  return {
    name: parseChapterName(chapter),
    bool: parseRawBool(chapter),
    party: parseRawParty(chapter),
    actions: parseRawList(chapter, '>$', /^\>\$(.*)/gm),
    media: parseRawList(chapter, '>>', /^\>\>(.*)/gm),
    next: parseRawList(chapter, '>#', /^\>#(.*)/gm),
    dialog: []
  }
}

/** Chapter properties and raw dialog */
function splitChapterDialog(raw: string): [string, string] {
  const i = raw.search(/^##\s/gm);

  if (i === -1) return [raw, ''];

  return [raw.substring(0, i), raw.substring(i)]
}

function parseRawBool(str: string): string {
  const all = str.matchAll(/^\>\!(.*)/gm);

  for (const m of all) {
    const value = m.filter(e => e?.indexOf('>!'));
    if (value[0]) return value[0];
  }

  return '';
}

function parseChapterName(str: string): string {
  const all = str.matchAll(/^#\s(.*)\||^#\s(.*)/gm);
  for (const m of all) {
    const value = m.filter(e => e?.indexOf('# '));
    if (value[0]) return value[0];
  }

  return '';
}

function parseRawParty(str: string): string[] {
  const all = str.matchAll(/^#\s.*\|(.*)/gm);
  for (const m of all) {
    const value = m.filter(e => e?.indexOf('# '));
    if (value[0]) return value[0].split(',');
  }
  return [];
}

function parseRawList(str: string, mark: string, reg: RegExp): string[] {
  const res: string[] = [];

  const all = str.matchAll(reg);
  for (const m of all) {
    const value = m.filter(e => e?.indexOf(mark));
    if (value[0]) res.push(value[0])
  }

  return res;
}
