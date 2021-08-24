import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { BaseWidget } from './base/base.widget';

@Component({
  selector: 'bt-button',
  template: `
<button
  [ngClass]="ngClass"
  [ngStyle]="ngStyle"
  (click)="onPress()"
>
  <div class="bt-button__content">
    <ng-content></ng-content>
  </div>
</button>
`
})
export class BtButtonComponent extends BaseWidget {
  @Output()
  public press = new EventEmitter<void>();

  public onPress(): void {
    if (this.isEnabled)
      this.press.emit();
  }

  protected buildClass() {
    return {
      ...super.buildClass(),
      'bt-button': true,
      'disabled': !this.isEnabled,
    }
  }
}
