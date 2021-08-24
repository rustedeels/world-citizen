import { CommonModule } from '@angular/common';
import {
  NgModule,
  Type,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BtButtonComponent } from './button.component';

const ELEMENTS: Type<unknown>[] = [
  BtButtonComponent
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
