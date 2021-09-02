import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { BaseWidget } from './base.widget';

@Component({ template: `` })
export abstract class BaseValueWidget<T> extends BaseWidget {
  private _value?: T;

  @Input()
  public set value(v: T | undefined) {
    this.setValue(v);
  }
  public get value() {
    return this._value;
  }

  @Output()
  public valueChange = new EventEmitter<T>();

  protected buildClass() {
    return {
      ...super.buildClass(),
      'wc-component-value': true,
    }
  }

  private setValue(v?: T): void {
    if (v === this.value) return;
    this._value = v;
    this.valueChange.emit(v);
  }
}
