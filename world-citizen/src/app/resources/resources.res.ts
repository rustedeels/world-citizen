import { Resource } from '@ngx-batatas/engine';
import { ResourceNames } from './resources.names';

export const STORY_RESOURCES: Resource[] = [
  {
    id: ResourceNames.imageUnknownPlayer,
    type: 'image',
    tags: [],
    path: '/assets/resources/core/imageUnknownPlayer.png',
  },
  {
    id: ResourceNames.soundPlaneCrash,
    type: 'sound',
    tags: ['plane', 'crash'],
    path: '/assets/resources/core/sound.plane_crash.mp3',
  },
  {
    id: ResourceNames.soundPlaneFlyOver,
    type: 'sound',
    tags: ['plane', 'fly-over'],
    path: '/assets/resources/core/sound.plane_fly-over.mp3',
  },
  {
    id: ResourceNames.soundPolice,
    type: 'sound',
    tags: ['police'],
    path: '/assets/resources/core/sound.police.mp3',
  },
  {
    id: ResourceNames.soundScratch,
    type: 'sound',
    tags: ['scratch'],
    path: '/assets/resources/core/sound.scratch.mp3',
  }
]
