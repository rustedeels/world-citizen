import { join } from 'https://deno.land/std@0.105.0/path/mod.ts';

import { generateMapper } from './mapper/generate-mapper.ts';
import { parseChapters } from './parser/parser.ts';

const filePath = Deno.args[0];
const targetDir = Deno.args[1];

if (!filePath || !targetDir ) {
  console.warn('A file is required!')
  Deno.exit(1)
}

console.log('Reading chapter: ' + filePath);
console.log('Saving map to dir: ' + targetDir);

const paths = filePath.split(',');
const content: string[] = [];
for (const p of paths)
  content.push(await Deno.readTextFile(p));

const resTargetFile = join(targetDir, 'resources.map.ts');
const charTargetFile = join(targetDir, 'characters.map.ts');

const raw = parseChapters(content);
const resourcesNames: string[] = [];
const characterNames: string[] = [];

function isGeneric(str: string): boolean {
  return !!str 
    && !!str.length 
    && str.indexOf('`') === 0
    && str.lastIndexOf('`') === str.length - 1;
}

function addName(target: string[], m: { name: string }[]) {
  for (const e of m)
    if (!isGeneric(e.name))
      target.push(e.name)
}

for (const r of raw) {
  addName(resourcesNames, r.media);
  addName(resourcesNames, r.dialog.flatMap(e => e.media));
  addName(resourcesNames, r.dialog.flatMap(e => e.text.flatMap(x => x.media)));
  addName(characterNames, r.party)
}

await generateMapper(resourcesNames, resTargetFile, 'resources');
await generateMapper(characterNames, charTargetFile, 'characters');
