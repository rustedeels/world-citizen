import { EntityState } from '@datorama/akita';

export interface Fixation {
  id: string;
  name: string;
  desc: string;
  level: number;
}

export enum FixationLevel {
  obsession = 90,
  love = 75,
  likes = 40,
  curious = 10,
  neutral = 0,
  uncurious = -10,
  dislikes = -40,
  hate = -75,
  disgust = -90,
}

export interface FixationState extends EntityState<Fixation, string> {}
export const FixationStoreName = '$fixations';
