import { EntityState } from '@datorama/akita';

import { BodyPartId } from '../body-part';

export const PLAYER_ID = '#PLAYER';
export const CharStoreName = '$characters';

export interface Char {
  id: string;
  name: string;
  portrait: string;
  surname: string;
  birth: `${number}-${number}-${number}`;
  gender: number;
}

export interface CharState extends EntityState<Char, string> {}

export interface CharInit {
  id: string;
  name: string;
  resourceId: string;
  surname: string;
  birth: Date;
  gender: number;
  body?: BodyPartId[];
}

export enum Gender {
  Macho = -90,
  Man = -45,
  Boi = -25,
  Demiboi = -10,
  Androgyne = 0,
  Demigirl = 10,
  Girl = 25,
  Woman = 45,
  JKRowling = 90,
}
