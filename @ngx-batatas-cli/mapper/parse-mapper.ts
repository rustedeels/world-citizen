export interface MapperFile {
  map: Map<string, string>,
  exportName: string,
  source: string
}

export type MapperType = 'resources' | 'characters';

export function parseMapper(type: MapperType, content?: string): MapperFile {
  const mapper: MapperFile = {
    exportName: type == 'resources' ? 'RESOURCES' : 'CHARACTERS',
    map: new Map<string, string>(),
    source: content ?? ''
  }

  if (content && content.lastIndexOf('export const ') !== -1) {
    const name = getName(content);
    const index = content.lastIndexOf('export const ');
    if (!name) {
      mapper.source = '';
      return mapper;
    }

    mapper.exportName = name;
    mapper.source = content.substring(0, index);

    const matchAll = content.substring(index).matchAll(/(\w+):(.*)\,{1}|(\w+):(.*)/gm)
    for (const m of matchAll) {
      const key = m[1] ?? m[3];
      const value = m[2] ?? m[4] ?? '\'\'';
      if (key && !mapper.map.has(key))
        mapper.map.set(key, value);
    }
  }

  return mapper;
}

function getName(str: string): string | undefined {
  const index = str.lastIndexOf('export const ');
  const target = str.substring(index);
  const matchAll = target.matchAll(/^export\sconst\s(\w+)/gm)

  for (const m of matchAll) {
    if (m[1]) return m[1].trim()
  }

  return;
}
