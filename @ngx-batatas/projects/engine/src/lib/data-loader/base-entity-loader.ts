import { EntityStore } from '@datorama/akita';

import { LoggerService } from '../logger';
import { BaseLoader } from './base-loader';

export abstract class BaseEntityLoader<T extends { id: string }> extends BaseLoader<T> {

  public constructor (
    logger: LoggerService,
    protected readonly _store: EntityStore,
  ) { super(logger); }

  protected async loadItem(item: T): Promise<[true] | [false, string] | [false, string, unknown]> {
    try {
      const i = await this.beforeInsert(item);
      this._store.upsert(i.id, i);
      return [true];
    } catch (err) {
      return [false, "Exception thrown", err]
    }
  }

  protected async beforeInsert(item: T): Promise<T> { return item; }
}

export abstract class BaseEntityGenerator<
  T extends { id: string }, K  extends { id: string }
> extends BaseLoader<K> {

  public constructor (
    logger: LoggerService,
    protected readonly _store: EntityStore,
  ) { super(logger); }

  protected async loadItem(item: K): Promise<[true] | [false, string] | [false, string, unknown]> {
    try {
      const newItems = await this.generate(item)
      for (const i of newItems) {
        this._store.upsert(i.id, i);
      }
      return [true];
    } catch (err) {
      return [false, "Exception thrown", err]
    }
  }

  protected abstract generate(item: K): Promise<T[]>;
}
