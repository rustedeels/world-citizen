export interface BodyPart {
  id: string;
  type: BodySlot;
  name: string;
  exp: number;
}

export type BodySlot =
| 'body'
| 'hair'
| 'eyes'
| 'ears'
| 'mouth'
| 'nose'
| 'tits'
| 'hands'
| 'feet'
| 'anus'
| 'gen';

export type BodyPartId =
| 'bodyMale'
| 'bodyFemale'
| 'flatChest'
| 'smallTits'
| 'tits'
| 'bigTits'
| 'smallDick'
| 'dick'
| 'bigDick'
| 'tightPussy'
| 'pussy'
| 'loosePussy'
| 'tightAnus'
| 'anus'
| 'looseAnus'
| 'shortHair'
| 'longHair'
| 'eyes'
| 'ears'
| 'mouth'
| 'nose'
| 'hands'
| 'feet'
;

export type BodyPartIdMap<T extends BodyPartId, V> = {
  [key in T]: V;
}

export type BodyPartSlotMap<T extends BodyPartId> = BodyPartIdMap<T, BodySlot>;
export type BodyPartPathMap<T extends BodyPartId> = BodyPartIdMap<T, [string, number] | undefined>;
