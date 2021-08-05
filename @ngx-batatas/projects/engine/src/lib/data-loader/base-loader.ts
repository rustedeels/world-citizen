import { LoggerService } from '../logger';
import { ProgressReport } from './progress-report';

export abstract class BaseLoader<T extends { id: string }> {
  private readonly _queue = new Map<string, T>();
  private __toAdd?: T[];

  public constructor(
    protected readonly _logger: LoggerService,
  ) {}

  /** Add items to be loaded */
  public add(...items: T[]): void {
    for (const i of items) {
      this._queue.set(i.id, i);
    }
  }

  /** Add items to be loaded, skip duplicated ids */
  public addUnique(...items: T[]): void {
    for (const i of items) {
      if (this._queue.has(i.id)) {
        this._logger.warning(
          'Trying to add a duplicated item\n',
          { $preserve: true },
          i, this._queue.get(i.id)
        );

        continue;
      }

      this._queue.set(i.id, i);
    }
  }

  public reset(): void {
    this._queue.clear();
    this.__toAdd = undefined;
  }

  /** Prepare items to be loaded */
  public preload(report: ProgressReport): void {
    this.__toAdd = this.__toAdd ?? [];
    if (this._queue.size === 0) return;

    for (const i of this._queue.values()) {
      this.__toAdd.push(i);
    }

    this._queue.clear();
    report.addTotal(this.__toAdd.length);
  }

  /** Load items in preload */
  public async load(report: ProgressReport): Promise<void> {
    if (!this.__toAdd?.length) return;

    for (const i of this.__toAdd) {
      const [success, msg, extra] = await this.loadItem(i);
      if (!success) { this.logError(msg ?? 'unkown', i, extra) }
      report.reportProgress();
    }
  }

  protected abstract loadItem(item: T): Promise<[true] | [false, string] | [false, string, unknown]>;

  protected logError(message: string, item: T, extra?: unknown): void {
    const msg = `Error loading item: ${message}`;
    this._logger.error(msg,
      { $preserve: true },
      item,
      extra
    );
  }
}
