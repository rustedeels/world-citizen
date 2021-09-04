export interface ResMap {
  [key: string]: string | undefined;
}
export declare type ResourceType = 'video' | 'image' | 'sound' | 'music' | 'background';

export const RES_TYPES: ResourceType[] = ['video', 'image', 'sound', 'music', 'background'];

export interface Resource {
  id: string;
  type: ResourceType;
  tags: string[];
  path: string;
}
