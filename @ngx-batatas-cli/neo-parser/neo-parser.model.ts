export interface NeoParserOptions {
  resourcesFolder: string;
  sourcesFolder: string;
  outputFolder: string;

  nameFile: string;
  mapFile: string;
  resFile: string;
  packageFile: string;
}

export function buildOptions(o: Partial<NeoParserOptions>): NeoParserOptions {
  return {
    resourcesFolder: o.resourcesFolder || 'resources',
    sourcesFolder: o.sourcesFolder || 'sources',
    outputFolder: o.outputFolder || 'output',
    mapFile: o.mapFile || '.map.ts',
    nameFile: o.nameFile || '.name.ts',
    resFile: o.resFile || '.res.ts',
    packageFile: o.packageFile || '.pack.ts',
  }
}

export interface SourcePack {
  /** Package name */
  name: string;
  /** Source files */
  src: string[];
  /** resource files */
  res: string[];
  /** file to save characters map */
  charMap: string;
  /** file to save resources map */
  resMap: string;
  /** file to list all resources */
  resList: string;
  /** file to enum resources names */
  resNames: string;
  /** file to save package info */
  package: string;
}
