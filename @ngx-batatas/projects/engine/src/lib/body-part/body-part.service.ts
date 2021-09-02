import { Injectable } from '@angular/core';

import { pascalToTitle } from '../tools/string.tools';
import {
  BodyPartsImageMap,
  BodyPartsMap,
} from './body-part.map';
import {
  BodyPart,
  BodyPartId,
  BodyPartPathMap,
  BodyPartSlotMap,
} from './body-part.model';

@Injectable({ providedIn: 'platform' })
export class BodyPartService<T extends BodyPartId> {
  private __slotMap: BodyPartSlotMap<T> = BodyPartsMap;
  private __pathMap: BodyPartPathMap<T> = BodyPartsImageMap;

  public constructor(){}

  public setMap(map: BodyPartSlotMap<T>): void {
    this.__slotMap = map;
  }

  public setPathMap(map: BodyPartPathMap<T>): void {
    this.__pathMap = map;
  }

  public getBodyPart(id: T): BodyPart;
  public getBodyPart(id: T, name: string): BodyPart;
  public getBodyPart(id: T, name: string, exp: number): BodyPart;
  public getBodyPart(id: T, name?: string, exp?: number): BodyPart {
    const n = name ?? pascalToTitle(id);
    return {
      id,
      type: this.__slotMap[id],
      exp: exp ?? 0,
      name: n
    };
  }

  public getPathName(id: T): [string, number] | undefined {
    return this.__pathMap[id];
  }
}
