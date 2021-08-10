export function setGlobal<T>(key: symbol, value: T): void {
  window[key as any] = value as any;
}

export function getGlobal<T>(key: symbol): T | undefined {
  return window[key as any] as any;
}
