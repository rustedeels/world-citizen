import { BehaviorSubject } from 'rxjs';

export type KEY<T> = Extract<keyof T, string>;

export class StateMachine<T extends {}> {
  private readonly _history: KEY<T>[] = [];
  private readonly _state: BehaviorSubject<KEY<T>>;

  public constructor(
    private readonly initialState: KEY<T>,
  ) {
    this._state = new BehaviorSubject(initialState);
  }

  public get name() { return this._state.value; }
  public get state() { return this._state.asObservable(); }

  public getPrevState() {
    return this._history.slice(-1)[0] ?? this.initialState;
  }

  public nextState(name: KEY<T>): void {
    if (name === this.name) return;
    this._history.push(this.name);
    this._state.next(name);
  }

  public prevState(): void {
    const name = this._history.pop() ?? this.initialState;
    this._state.next(name)
  }
}
