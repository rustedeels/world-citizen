import { EntityState } from '@datorama/akita';

export type ResourceType = 'video' | 'image' | 'sound' | 'music'
export const ResourceStoreName = '$resources';

export interface Resource {
  id: string;
  type: ResourceType;
  tags: string[];
  path: string;
}

export interface ResourceState extends EntityState<Resource, string> {}
