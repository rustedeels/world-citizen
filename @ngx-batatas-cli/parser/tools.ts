import { RawProperty } from './core/models/chapter.model.ts';
import { MultiToken, SingleToken, Token } from './models.ts';
import { PROPERTY_REGEX } from './tokens.ts';

/** Extract property in format text[prop](bool) */
export function extractProp(src: string): RawProperty {
  const m = matchSingle(src, PROPERTY_REGEX);
  if (!m) throw new Error('Error match property for: ' + src);

  return {
    name: m[1] ?? m[4] ?? m[6] ?? m[8] ?? '',
    props: m[2] ?? m[5] ?? '',
    bool: m[3] ?? m[7] ?? '',
  }
}

/** Return first match and its groups */
export function matchSingle(src: string, regex: RegExp): RegExpMatchArray | undefined {
  const all = src.matchAll(regex);
  for (const m of all) return m;
  return undefined;
}

/**
 * Extract match strings
 * 
 * @param src Source string
 * @param token Token to match
 */
export function extractToken(src: string, token: MultiToken): string[]
export function extractToken(src: string, token: SingleToken): string;
export function extractToken(src: string, token: Token): string | string[] {
  const res: string[] = [];
  const matches = src.matchAll(token.regex);

  for (const m of matches) {
    const group = (m && m[1])?.trim();
    if (group) res.push(group);
    if (!token.multi) break;
  }

  return token.multi ? res : (res[0] || '');
}

/**
 * Split string by regex match
 * 
 * @param str Source string
 * @param regex Regex to match split points
 * @returns string parts
 */
export function regexSplit(str: string, regex: RegExp): string[] {
  const res: string[] = [];

  while (true) {
    const i = str.search(regex);
    if (i === -1) break;

    str = str.substring(i);

    const i2 = str.substring(1).search(regex);
    if (i2 === -1) {
      res.push(str);
      break;
    }

    res.push(str.substring(0, i2 + 1));
    str = str.substring(i2 + 1);
  }

  return res;
}
