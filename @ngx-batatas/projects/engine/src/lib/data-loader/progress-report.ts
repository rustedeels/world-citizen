import { EventEmitter } from '@angular/core';

export interface ProgressState {
  current: number;
  total: number;
  progress: number;
}

export class ProgressReport {
  private _current = 0;
  private _total = 0;

  public progress$ = new EventEmitter<ProgressState>();

  public get state(): ProgressState {
    return {
      current: this._current,
      total: this._total,
      progress: this.progress
    }
  }

  public get progress(): number {
    if (this._total === 0 || this._current === 0) return 0;
    const perc = this._current * 100 / this._total;
    return Math.floor(perc);
  }

  public reportProgress(n?: number): void {
    this._current += n ?? 1;
    this.progress$.emit(this.state);
  }

  public addTotal(n: number): void {
    this._total += n;
    this.progress$.emit(this.state);
  }
}
