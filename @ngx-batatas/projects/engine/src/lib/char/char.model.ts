import { EntityState } from '@datorama/akita';

import { BodyPartId } from '../body-part';

export const PLAYER_ID = '#PLAYER';
export const CharStoreName = '$characters';

export interface Char {
  id: string;
  name: string;
  portrait: string;
}

export interface CharState extends EntityState<Char, string> {}

export interface CharInit {
  id: string;
  name: string;
  resourceId: string;
  body?: BodyPartId[];
}
