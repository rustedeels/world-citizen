import { exists } from 'https://deno.land/std@0.105.0/fs/mod.ts';
import { join } from 'https://deno.land/std@0.105.0/path/mod.ts';

import { loadMapper } from './res/load-mapper.ts';
import {
  ResMap,
  Resource,
} from './res/models.ts';
import {
  buildResKey,
  readDir,
} from './res/read-src.ts';

const src = Deno.args[0];
const dest = Deno.args[1];
const destFileName = Deno.args[2] ?? 'resources';

if (!src || !dest) {
  console.error('Invalid call a source and destination directories are required');
  console.info('Invoke as \'res.ts [source] [destination] [name(resources as default)]\'');
  Deno.exit(1);
}

if (!await exists(src)) {
  console.error(`Source not found: ${src}`);
  Deno.exit(2);
}

if (!await exists(dest)) {
  console.error(`Destination not found: ${dest}`);
  Deno.exit(3);
}

const mapperFileName = `${destFileName}.names`;
const mapperFile = join(dest, `${mapperFileName}.ts`);
const resFile = join(dest, `${destFileName}.res.ts`);

let resMap: ResMap = {};
if (await exists(mapperFile)) {
  console.log('Mapper file found, new values will be appended');
  const content = await Deno.readTextFile(mapperFile);
  resMap = loadMapper(content);
} else {
  console.log('Mapper file not found, a new one will be created');
}

const resList = await readDir(src, resMap);

const validKeys = resList.map(e => buildResKey(e.path));
for (const k of Object.keys(resMap)) {
  if (validKeys.indexOf(k) !== -1) continue;
  console.warn(`File for key [${k}] was not found in dir`);
  delete resMap[k];
}

function mapEntriesToContent(map: ResMap): string {
  return Object.entries(map)
    .filter(e => e && e[1])
    .map(e => `  ${e[0]} = '${e[1] || ''}'`)
    .join(',\n');
}

function mapResources(res: Resource[]): string {
  return res.map(e => `  {
    id: ResourceNames.${e.id},
    type: '${e.type}',
    tags: [${e.tags.map(t => `'${t}'`).join(', ')}],
    path: '${e.path}',
  }`).join(',\n');
}

const mapperFileContent = `export enum ResourceNames {
${mapEntriesToContent(resMap)}
}`;

const resFileContent = `import { Resource } from '@ngx-batatas/engine';
import { ResourceNames } from './${mapperFileName}';

export const STORY_RESOURCES: Resource[] = [
${mapResources(resList)}
]
`;

await Deno.writeTextFile(mapperFile, mapperFileContent);
await Deno.writeTextFile(resFile, resFileContent);
