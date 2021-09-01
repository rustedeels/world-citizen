export interface CustomView<T> {
  name: string;
  onReady(input?: T): Promise<void>;
  options: CustomViewOptions;
}

export interface CustomViewOptions {
  /** Allow user to return to previous state */
  allowReturn: boolean;
}

export interface ShowCustomView<T> {
  name: string;
  params?: T;
}
