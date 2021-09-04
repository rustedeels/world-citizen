import {
  ActiveState,
  EntityState,
} from '@datorama/akita';

import { Media } from '../chapter/chapter.model';

export type Size = [width: string, height: string];
export type Point = [x: number, y: number];

export interface MapEvent {
  event: string;
  params: string;
  bool: string;
}

export interface MapPlace {
  id: string;
  /** Resources to render */
  resource: Media[];
  /** Resolution to use has reference */
  size: Size;
  /** Events to trigger */
  events: MapEvent[];
}

export interface Marker {
  id: string;
  /** image to use */
  resource: Media;
  /** Target place id */
  target: string;
  /** left, top positions */
  pos: [number, number];
  /** width, height of item */
  size: [number, number];
  /** can show */
  bool: string;
  /** class to add to item */
  cssClass: string[];
}

export interface MarkerPlace extends Marker {
  /** Id of place to navigate */
  toPlace: string;
}

export interface MarkerChapter extends Marker {
  /** Id of chapter to navigate */
  toChapter: string;
}

export interface MarkerEvent extends Marker {
  /** trigger event */
  event: string;
  /** Event eval params */
  params: string;
}

export type MapMarker = MarkerPlace | MarkerChapter | MarkerEvent;

export interface MapPlaceState extends EntityState<MapPlace, string>, ActiveState {}
export const MapPlaceStoreName = '$map-places';
