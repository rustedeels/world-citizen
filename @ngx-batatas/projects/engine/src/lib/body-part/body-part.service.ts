import { Injectable } from '@angular/core';

import { pascalToTitle } from '../tools/string.tools';
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
    const n = name ?? pascalToTitle(id);
    return {
      id,
      type: this.__map[id],
      exp: exp ?? 0,
      name: n
    };
  }
}
