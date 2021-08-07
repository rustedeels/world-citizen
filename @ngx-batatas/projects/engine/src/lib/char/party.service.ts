import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'platform' })
export class PartyService {
  private readonly __party = new Set<string>();

  public constructor() {}

  public clear(): void {
    this.__party.clear();
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
