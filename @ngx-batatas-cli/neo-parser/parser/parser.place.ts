import { RawPlace } from './parser.model.ts';
import {
  BOOL,
  EVENT,
  MEDIA,
  PLACE,
  SECTION_REGEX,
  SIZE,
} from './parser.tokens.ts';
import {
  extractToken,
  matchSingle,
  multiProp,
  P,
  parseRawSize,
  regexSplit,
} from './parser.tools.ts';

export function parcePlaces(sources: string[]): RawPlace[] {
  return sources.flatMap(parceRawPlaces);
}

function parceRawPlaces(src: string): RawPlace[] {
  const parts = regexSplit(src, PLACE.regex);
  if (!parts.length) return [];
  if (parts.length === 1) return parts.map(e => parceRawPlace(e, ''))

  const prefix = parts[0]?.trim() ?? '';
  return parts.slice(1).map(e => parceRawPlace(e, prefix));
}

function parceRawPlace(src: string, prefix: string): RawPlace {
  return {
    name: parsePlaceName(src, prefix),
    bool: extractToken(src, BOOL),
    size: parseRawSize(src, SIZE.regex),
    events: multiProp(src, EVENT),
    media: multiProp(src, MEDIA),
  }
}

function parsePlaceName(src: string, prefix: string): string {
  const m = matchSingle(src, SECTION_REGEX);
  if (!m) throw new Error('Error parsing place title')
  const name = m[1] ?? m[3] ?? '';
  return P(name, prefix);
}

