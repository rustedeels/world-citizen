import { EntityState } from '@datorama/akita';

export interface Attribute {
  id: string;
  name: string;
  desc: string;
  exp: number;
}

export type CoreAttr =
|  'strength'
|  'endurance'
|  'agility'
|  'intelligence'
|  'charisma'
|  'openess'
|  'dominance'
|  'submission'
;

export type AttributeMap<T extends CoreAttr> = {
  [key in T]: string; // Description
}

export interface CharAttributes<T extends CoreAttr> {
  id: string;
  attr: { [key in T]: Attribute }
}

export interface CharAttributeState<T extends CoreAttr>
  extends EntityState<CharAttributes<T>, string> {}
export const CharAttributeStoreName = '$attributes';
