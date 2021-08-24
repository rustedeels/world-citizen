export const EngineStoreName = '$engine';

export interface EngineState {
  version: `${number}.${number}.${number}`,
}

export interface BatatasState {
  isDevelopment: boolean;
  appName: string;
  developer: string;
  title: string;
}
