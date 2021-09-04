import { readTextFile } from '@tauri-apps/api/fs';

import { parseChapters } from './parser.chapter';
import { parseMarkers } from './parser.marker';
import {
  RawFile,
  RawFileType,
  RawParserResult,
} from './parser.model';
import { parcePlaces } from './parser.place';

export async function parseSources(files: RawFile[]): Promise<RawParserResult> {
  const chapters = parseChapters(await getSourceFile(files, 'chapter'))
  const places = parcePlaces(await getSourceFile(files, 'place'))
  const markers = parseMarkers(await getSourceFile(files, 'marker'))

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
