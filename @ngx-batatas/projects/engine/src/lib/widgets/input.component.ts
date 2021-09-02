import {
  Component,
  Input,
} from '@angular/core';

import { BaseValueWidget } from './base/base-value.widget';

@Component({
  selector: 'bt-input',
  template: `
<div [ngClass]="ngClass" [ngStyle]="ngStyle">
  <label>{{label}}</label>
  <input
    class="input"
    [(ngModel)]="value"
    [placeholder]="placeholder"
    [type]="type"
    [attr.disabled]="isEnabled ? null : ''"
    [attr.readonly]="isReadOnly ? '': null"
    [class.disabled]="!isEnabled"
    [class.readonly]="isReadOnly"
  />
</div>
  `,
})
export class BtInputComponent extends BaseValueWidget<string> {

  @Input()
  public type = 'text';

  protected buildClass() {
    return {
      ...super.buildClass(),
      'bt-input': true,
    }
  }
}
