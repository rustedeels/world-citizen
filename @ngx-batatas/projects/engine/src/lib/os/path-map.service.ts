import { Injectable } from '@angular/core';
import { createDir } from '@tauri-apps/api/fs';
import { currentDir, dataDir } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';

import { buildPath, splitPath, toUnix } from '../tools/path.tools';

/** Map OS paths to running context */
@Injectable({ providedIn: 'platform' })
export class OSPathMapService {

  public constructor () {}

  /** Map OS path to context */
  public map(path: string): string {
    return convertFileSrc(path);
  }

  /** Build full path and resolve from OS to context */
  public resolvePath(dir: string, path: string): string {
    return this.map(buildPath(toUnix(dir), toUnix(path)));
  }

  /** Resolve path in current working directory */
  public async resolveCurrentDir(path: string): Promise<string> {
    const current = await currentDir();
    return this.resolvePath(current, path);
  }

  /** Resolve path in data directory */
  public async resolveDataDir(path: string): Promise<string> {
    const baseDir = await dataDir();
    const [folders, _] = splitPath(path);
    await createDir(buildPath(baseDir, folders));
    return this.resolvePath(baseDir, path);
  }
}
