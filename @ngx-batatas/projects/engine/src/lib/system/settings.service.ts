import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { LoggerService } from '../logger';
import {
  appWindow,
  PhysicalSize,
} from '../tauri/api';
import { AppSettings } from './system.model';
import { UserDataService } from './user-data.service';

const DEFAULT_SETTINGS: AppSettings = {
  fullscreen: true,
  height: 768,
  width: 1240,
  masterVolume: 100,
  musicVolume: 100,
  soundVolume: 100,
  zoom: 100,
}

const FILE_NAME = 'settings.json';

@Injectable({ providedIn: 'platform' })
export class SettingsService {
  private _current = new BehaviorSubject(DEFAULT_SETTINGS);

  constructor(
    private readonly _userData: UserDataService,
    private readonly _logger: LoggerService,
  ) {}

  public get settings() { return this._current; }

  public async saveSettings(settings: AppSettings): Promise<void> {
    await this._userData.save(settings, FILE_NAME);
    this._current.next(settings);
  }

  public async loadSettings(): Promise<AppSettings> {
    try {
      const { data } = await this._userData.load<AppSettings>(FILE_NAME);
      return await this.syncValues(data);
    } catch (err) {
      this._logger.error('Error loading settings, a new one will be created');
      await this.saveSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  }

  public async getSettings(): Promise<AppSettings> {
    if (this._current.value !== DEFAULT_SETTINGS)
      return this._current.value;
    return await this.loadSettings();
  }

  /** Load settings file and set values */
  public async refreshSettings(): Promise<void> {
    const s = await this.getSettings();
    this._logger.engine('Loading settings', s);

    await appWindow.setFullscreen(s.fullscreen);
    await appWindow.setResizable(!s.fullscreen);

    if (!s.fullscreen) {
      await appWindow.setSize(new PhysicalSize(s.width, s.height))
    }

    const fontSize = 16 * s.zoom / 100;
    document.documentElement.style.setProperty('--root-font-size', `${fontSize}px`);
  }

  /** Add new values to settings */
  private async syncValues(settings: AppSettings): Promise<AppSettings> {
    const target: AppSettings = { ...DEFAULT_SETTINGS };
    Object.assign(target, settings);
    await this.saveSettings(target);
    return target;
  }
}
