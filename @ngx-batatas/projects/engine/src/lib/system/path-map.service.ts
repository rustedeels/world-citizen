import { Injectable } from '@angular/core';
import { createDir } from '@tauri-apps/api/fs';
import { currentDir, dataDir } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';

import { buildPath, toUnix } from '../tools/path.tools';

/** Map OS paths to running context */
@Injectable({ providedIn: 'platform' })
export class OSPathMapService {
  private _currentDir = '/';
  private _dataDir = '/';

  public constructor () {}

  public async refresh(): Promise<void> {
    this._currentDir = await currentDir();
    this._dataDir = await dataDir();
  }

  public async createPathDir(path: string) {
    await createDir(path, { recursive: true });
  }

  /** Map OS path to context */
  public map(path: string): string {
    return convertFileSrc(path);
  }

  /** Build full path and resolve from OS to context */
  public resolvePath(dir: string, path: string): string {
    return this.map(buildPath(toUnix(dir), toUnix(path)));
  }

  /** Resolve path in current working directory */
  public resolveCurrentDir(path: string): string {
    const current = this._currentDir;
    return this.resolvePath(current, path);
  }

  /** Resolve path in data directory */
  public resolveDataDir(path: string): string {
    const baseDir = this._dataDir;
    return this.resolvePath(baseDir, path);
  }
}
