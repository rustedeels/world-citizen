import {
  join,
  parse,
} from 'https://deno.land/std@0.105.0/path/mod.ts';
import * as CONVERT from 'https://dev.jspm.io/js-convert-case';

import {
  RES_TYPES,
  ResMap,
  Resource,
  ResourceType,
} from './models.ts';

const toCamelCase = (CONVERT.default as { toCamelCase: (s: string) => string})['toCamelCase'];

function getTypeByExtension(ext: string): ResourceType {
  ext = ext.toLowerCase();
  const img = ['.png', '.jpg', '.gif', '.svg'];
  const video = ['.mp4', '.ogv', '.webm'];
  const music = ['.mp3', '.m4a', '.wav'];

  if (img.indexOf(ext) !== -1) return 'image';
  if (video.indexOf(ext) !== -1) return 'video';
  if (music.indexOf(ext) !== -1) return 'music';

  console.warn('Can\'t resolve type for extension: ' + ext);
  return 'image';
}

function getFileType(path: string): ResourceType {
  const d = parse(path);

  if (d.name.indexOf('back') == 0)
    return 'background';
  if (d.name.indexOf('img') == 0)
    return 'image';
  
  for (const t of RES_TYPES) {
    if (d.name.indexOf(t) === 0)
      return t;
  }

  console.warn('Can\'t resolve type by name for file: ' + path);
  return getTypeByExtension(d.ext);
}

function getTags(path: string): string[] {
  const d = parse(path);
  const tagList = d.name.split('.')[1];
  if (!tagList) return [];
  return tagList.toLowerCase().split('_');
}

export function buildResKey(path: string): string {
  return toCamelCase(
    parse(path).name
      .replaceAll('.', '_')
  );
}

function processFile(path: string, mapper: ResMap, root = '/assets'): Resource {
  const key = buildResKey(path);
  if (!mapper[key]) mapper[key] = crypto.randomUUID();

  return {
    id: key,
    // TODO: fix root replace
    path: path.replace(/^.*?assets/g, root).replaceAll('\\', '/'),
    tags: getTags(path),
    type: getFileType(path)
  };
}

export async function readDir(path: string, mapper: ResMap): Promise<Resource[]> {
  let res: Resource[] = [];

  for await (const d of Deno.readDir(path)) {
    const fullPath = join(path, d.name);
    if (d.isDirectory) {
      res = [...res, ...(await readDir(fullPath, mapper))];
      continue;
    } else if (d.isFile) {
      try {
        const r = processFile(fullPath, mapper);
        if (r) res.push(r);
      } catch (err) {
        console.error('Error processing file: ' + fullPath);
        console.error(err);
      }
    } else if (d.isSymlink) {
      console.warn('Symlink not supported');
    }
  }

  return res;
}
