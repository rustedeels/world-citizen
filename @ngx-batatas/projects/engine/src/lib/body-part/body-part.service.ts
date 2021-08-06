import { Injectable } from '@angular/core';

import { BodyPartsMap } from './body-part.map';
import { BodyPart, BodyPartId, BodyPartSlotMap } from './body-part.model';

@Injectable({ providedIn: 'platform' })
export class BodyPartService<T extends BodyPartId> {
  private __map: BodyPartSlotMap<T> = BodyPartsMap;

  public constructor(){}

  public setMap(map: BodyPartSlotMap<T>): void {
    this.__map = map;
  }

  public getBodyPart(id: T): BodyPart;
  public getBodyPart(id: T, name: string): BodyPart;
  public getBodyPart(id: T, name: string, exp: number): BodyPart;
  public getBodyPart(id: T, name?: string, exp?: number): BodyPart {
    const n = name ?? this.buildName(id);
    return {
      id,
      type: this.__map[id],
      exp: exp ?? 0,
      name: n
    };
  }

  private buildName(id: string): string {
    const matchs = id.matchAll(/[A-Z]/g);
    const set = new Set<string>();
    let name = id;

    for (const c in matchs)
      if (c[0])
        set.add(c[0])

    for (const s of set) {
      name = name.replaceAll(s, ' ' + s);
    }

    if (name.length) {
      const up = name[0].toUpperCase();
      name = up + name.substring(1)
    }

    return name;
  }
}
