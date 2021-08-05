import { Observable } from 'rxjs';

export interface StateEval<T> {
  sync$(): Observable<unknown>;
  sync(): Promise<unknown>;
  apply(...params: any[]): T;
}

export interface EvalMap { [key: string]: StateEval<any> }
