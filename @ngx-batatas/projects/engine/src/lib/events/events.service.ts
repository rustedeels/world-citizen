import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { LoggerService } from "../logger/logger.service";

@Injectable({ providedIn: 'root' })
export class EventsService<T extends object> {
  private readonly _subjects: { [k: string]: Subject<any> } = {}

  public constructor(private readonly _logger: LoggerService) {}

  /** Emit an event with a value */
  public emit<K extends Extract<keyof T, string>>(type: K, value: T[K]): void;
  /** Emit an event */
  public emit<K extends Extract<keyof T, string>>(type: K): void;
  public emit<K extends Extract<keyof T, string>>(type: K, value?: T[K]): void {
    this._logger.engine('Event emit: ' + type, value);
    this.getTopic(type).next(value);
  }

  /** Return topic for an event */
  public getTopic<K extends Extract<keyof T, string>>(type: K): Subject<T[K] | undefined> {
    let sub = this._subjects[type];
    if (!sub) {
      sub = new Subject();
      this._subjects[type] = sub;
    }

    return sub;
  }

  /** Subscribe to an event */
  public subscribe<K extends Extract<keyof T, string>>(
    type: K, op: (v: T[K] | undefined) => void
  ): Subscription {
    return this.getTopic(type).subscribe(op);
  }

  public getSubjects(): string[] {
    return Object.keys(this._subjects);
  }
}
