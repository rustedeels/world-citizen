import { Injectable } from '@angular/core';
import {
  createDir,
  readTextFile,
  writeFile,
} from '@tauri-apps/api/fs';
import { dataDir } from '@tauri-apps/api/path';

import { getBatatas } from '../core/core.utils';
import { getDateTimeString } from '../tools/date.tools';
import { UserData } from './system.model';

@Injectable({ providedIn: 'platform' })
export class UserDataService {

  /** Ensures base directory is created */
  public async ensureBaseDir(): Promise<void> {
    await this.getBasePath('saves');
  }

  /**
   * Save object into JSON file
   * @param data data to save
   * @param name name of file
   * @param category folder to put data in
   */
  public async save<T>(
    data: T,
    name: string,
    category?: string
  ): Promise<UserData<T>> {
    const dataToSave: UserData<T> = {
      data,
      name,
      image: '',
      date: getDateTimeString(new Date()),
    }

    const fullPath = [
      await this.getBasePath(category),
      name,
    ].join('/');

    await writeFile({
      path: fullPath,
      contents: JSON.stringify(dataToSave)
    });

    return dataToSave;
  }

  public async load<T>(name: string, category?: string): Promise<UserData<T>> {
    const fullPath = [
      await this.getBasePath(category),
      name,
    ].join('/');

    const content = await readTextFile(fullPath);
    return JSON.parse(content);
  }

  private async getBasePath(category?: string): Promise<string> {
    const parts = [
      await dataDir(),
      getBatatas('appName'),
    ];

    if (category) parts.push(category);
    const fullPath = parts.join('/');

    await createDir(fullPath, { recursive: true });

    return fullPath;
  }
}
