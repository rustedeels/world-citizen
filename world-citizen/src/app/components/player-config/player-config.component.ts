import { Component } from '@angular/core';
import {
  CustomView,
  CustomViewOptions,
} from '@ngx-batatas/engine';

@Component({
  template: `
<div class="wc-player-config full-screen">
  <bt-avatar class="avatar" ></bt-avatar>
</div>
`,
})
export class PlayerConfigComponent implements CustomView<string> {
  public name = 'playerConfig';
  public options: CustomViewOptions = {
    allowReturn: false,
  };

  public constructor() {}

  public async onReady(input?: string): Promise<void> {
    console.log(input);
  }
}
