import { ResMap } from './models.ts';

const captureRegex = /(\w+).*?=.*?\'(.*)\',?/gm

export function isMapperFile(content: string): boolean {
  return !content || content.search(captureRegex) !== -1;
}

export function loadMapper(content: string): ResMap {
  const mapper: ResMap = {};
  if (!isMapperFile(content)) return mapper;

  const allMatches = content.matchAll(captureRegex);
  for (const m of allMatches) {
    const fullMatch = m[0];
    const key = m[1];
    const value = m[2];

    if (!fullMatch) continue;
    if (!key) {
      console.warn('Invalid key in match: ', fullMatch);
      continue
    }

    mapper[key] = value;
  }


  return mapper;
}

export enum Resources {
  res1 = 'batatas1',
  res2 = 'batatas2'
}
