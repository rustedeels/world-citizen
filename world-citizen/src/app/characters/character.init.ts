import {
  CharInit,
  PLAYER_ID,
} from '@ngx-batatas/engine';

import { ResourceNames as CoreResources } from '../resources/resources.names';
import { ResourceNames as NewGameResources } from '../stories/new-game/resources.names';
import { CharacterNames } from './character.name';

export const CHARACTERS: CharInit[] = [
  {
    id: PLAYER_ID,
    birth: new Date(1989, 5, 10),
    gender: 50,
    name: 'Alex',
    surname: 'Smith',
    body: ['tits', 'dick', 'longHair'],
    resourceId: CoreResources.imageUnknownPlayer,
  },
  {
    id: CharacterNames.pilot,
    birth: new Date(1958, 7, 7),
    gender: -50,
    name: 'Pilot',
    surname: '',
    body: ['dick', 'flatChest', 'shortHair'],
    resourceId: NewGameResources.portraitPilot
  }
];
