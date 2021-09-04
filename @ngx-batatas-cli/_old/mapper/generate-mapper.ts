import { exists } from 'https://deno.land/std@0.105.0/fs/mod.ts';

import {
  MapperType,
  parseMapper,
} from './parse-mapper.ts';

export async function generateMapper(names: string[], targetPath: string, type: MapperType): Promise<boolean> {
  let content: string | undefined;
  if (await exists(targetPath))
    content = await Deno.readTextFile(targetPath);

  const mapper = parseMapper(type, content);

  for (const m of names) {
    if (!mapper.map.has(m))
      mapper.map.set(m, '\'\'');
  }

  const entries: string[] = [];
  mapper.map.forEach((v, k) => entries.push(`  ${k}: ${v.trim()},`));

  const newContent = `${mapper.source}export const ${mapper.exportName} = {
${entries.join('\n')}
}
`

  await Deno.writeTextFile(targetPath, newContent);

  return true;
}
