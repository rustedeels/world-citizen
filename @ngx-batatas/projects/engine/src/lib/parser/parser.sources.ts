import { readTextFile } from '@tauri-apps/api/fs';

import { parseAll } from './parser';
import { parseChapters } from './parser.chapter';
import { parserMarker } from './parser.marker';
import {
  RawFile,
  RawFileType,
  RawParserResult,
} from './parser.model';
import { parserPlace } from './parser.place';

export async function parseSources(files: RawFile[]): Promise<RawParserResult> {
  const chapters = parseChapters(await getSourceFile(files, 'chapter'))
  const places = parseAll(await getSourceFile(files, 'place'), parserPlace)
  const markers = parseAll(await getSourceFile(files, 'marker'), parserMarker)

  return { chapters, places, markers };
}

async function getSourceFile(files: RawFile[], type: RawFileType): Promise<string[]> {
  const sources: string[] = [];
  for (const file of files.filter(f => f.type === type)) {
    const src = await readTextFile(file.path);
    sources.push(src);
  }
  return sources;
}
