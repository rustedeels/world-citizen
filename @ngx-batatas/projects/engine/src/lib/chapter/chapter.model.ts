import { EntityState } from '@datorama/akita';
import { Chapter } from '@ngx-batatas/core';

export interface ChapterState extends EntityState<Chapter, string> {}
export const ChapterStoreName = '$chapters';
