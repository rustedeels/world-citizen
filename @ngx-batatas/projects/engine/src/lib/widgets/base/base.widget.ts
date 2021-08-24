import {
  Component,
  Input,
} from '@angular/core';

@Component({template: '' })
export class BaseWidget {
  public get ngStyle() { return this.buildStyles(); }
  public get ngClass() { return this.buildClass(); }

  @Input()
  public width?: string;

  @Input()
  public height?: string;

  @Input()
  public label = '';

  @Input()
  public isEnabled = true;

  @Input()
  public isReadOnly = false;

  @Input()
  public placeholder = '';

  protected buildStyles(): { [k: string]: string } {
    return {
      width: defaultV(this.width, 'invalid'),
      height: defaultV(this.height, 'invalid'),
    }
  }

  protected buildClass(): { [k: string]: boolean } {
    return {
      'bt-widget': true
    };
  }
}

function defaultV<T>(value: T | undefined, defaultValue: T): T {
  return typeof value === 'undefined' ? defaultValue : value;
}
