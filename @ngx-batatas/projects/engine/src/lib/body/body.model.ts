import { EntityState } from '@datorama/akita';

import { BodyPart, BodySlot } from '../body-part/body-part.model';

export type BodyParts = {
  [key in BodySlot]: BodyPart;
}

export type EquipSlot = {
  [key in BodySlot]: (string | 0)[];
}

export interface CharBody {
  id: string;
  parts: BodyParts;
  equipment: EquipSlot;
}

export interface BodyState extends EntityState<CharBody, string> {}
export const BodyStoreName = '$bodies';
