import { Injectable } from '@angular/core';

import { PLAYER_ID } from './char.model';

@Injectable({ providedIn: 'platform' })
export class PartyService {
  private readonly __party = new Set<string>();

  public constructor() {
    this.__party.add(PLAYER_ID);
  }

  public clear(): void {
    this.__party.clear();
    this.__party.add(PLAYER_ID)
  }

  public set(ids: string[]): void {
    this.clear();
    ids.forEach(id => this.add(id));
  }

  public add(id: string): void {
    this.__party.add(id);
  }

  public remove(id: string): void {
    this.__party.delete(id);
  }

  public has(id: string): boolean {
    return this.__party.has(id);
  }

  public get(): string[];
  public get(index: number): string | undefined;
  public get(index?: number): string[] | string | undefined {
    if (typeof index === 'undefined')
      return [...this.__party];
    return [...this.__party][index];
  }
}
