import { CommonModule } from '@angular/common';
import {
  NgModule,
  Type,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AVATAR_COMPONENTS } from './avatar/_index';
import { BtButtonComponent } from './button.component';
import { BtInputComponent } from './input.component';

const ELEMENTS: Type<unknown>[] = [
  BtButtonComponent,
  BtInputComponent,
  ...AVATAR_COMPONENTS,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ELEMENTS],
  exports: [ELEMENTS]
})
export class WidgetsModule {}
