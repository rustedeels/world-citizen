import {
  RawMarker,
  RawMarkerMedia,
  RawMarkerMediaType,
} from './parser.model';
import {
  BOOL,
  CSS,
  EVENT,
  MARKER,
  MARKER_CHAPTER,
  MARKER_MEDIA,
  MARKER_PLACE,
  MEDIA,
  POSITION,
  SIZE,
  TARGET,
} from './parser.tokens';
import {
  extractToken,
  matchSingle,
  multiProp,
  parseRawSize,
  regexSplit,
} from './parser.tools';

export function parseMarkers(src: string[]): RawMarker[] {
  return src.flatMap(parseRawMarkers);
}

function parseRawMarkers(src: string): RawMarker[] {
  const markers = regexSplit(src, MARKER.regex);
  return markers.map(parseRawMarker);
}

function parseRawMarker(src: string): RawMarker {
  const [marker, ...media] = regexSplit(src, MARKER_MEDIA.regex);
  if (!marker) throw new Error('Marker not defined for: ' + src);
  const name = parseMarkerName(marker);

  return {
    name,
    bool: extractToken(src, BOOL),
    targets: multiProp(src, TARGET),
    css: multiProp(src, CSS),
    chapter: multiProp(src, MARKER_CHAPTER),
    events: multiProp(src, EVENT),
    place: multiProp(src, MARKER_PLACE),
    media: media.map(parseRawMarkerMedia),
  }
}

function parseRawMarkerMedia(src: string): RawMarkerMedia {
  const type = parseMerkerMediaType(src);

  return {
    type,
    bool: extractToken(src, BOOL),
    css: multiProp(src, CSS),
    media: multiProp(src, MEDIA),
    size: parseRawSize(src, SIZE.regex),
    pos: parseRawSize(src, POSITION.regex),
  }
}

function parseMarkerName(src: string): string {
  const m = matchSingle(src, MARKER.regex);
  if (!m) throw new Error('Error parsing marker title')
  return m[1] ?? m[3] ?? '';
}

function parseMerkerMediaType(src: string): RawMarkerMediaType {
  const m = matchSingle(src, MARKER_MEDIA.regex);
  if (!m) throw new Error('Error parsing marker media type')
  const value = (m[1] ?? m[3] ?? 'iddle') as RawMarkerMediaType;
  const types: RawMarkerMediaType[] = ['click', 'hover', 'iddle'];
  if (!types.includes(value)) throw new Error('Invalid marker media type: ' + value);
  return value;
}
