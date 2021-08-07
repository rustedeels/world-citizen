import { Injectable } from '@angular/core';

import { pascalToTitle } from '../tools/string.tools';
import { AttributesMap } from './attr.map';
import { Attribute, AttributeMap, CoreAttr } from './attr.model';

@Injectable({ providedIn: 'platform' })
export class AttributeService<T extends CoreAttr> {
  private __state: AttributeMap<T> = AttributesMap;

  public constructor() {}

  public setMap(map: AttributeMap<T>): void {
    this.__state = map;
  }

  public getAttribute(id: T): Attribute;
  public getAttribute(id: T, name: string): Attribute;
  public getAttribute(id: T, name: string, exp: number): Attribute;
  public getAttribute(id: T, name?: string, exp?: number): Attribute {
    const n = name ?? pascalToTitle(id);
    return {
      desc: this.__state[id],
      exp: exp ?? 0,
      id,
      name: n
    };
  }
}
