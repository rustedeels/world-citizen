export interface UserData<T> {
  date: string;
  image: string;
  name: string;
  data: T;
}

export interface AppSettings {
  fullscreen: boolean;
  width: number;
  height: number;
  soundVolume: number;
  musicVolume: number;
  masterVolume: number;
  zoom: number;
}
