

import {
  Component,
  OnInit,
} from '@angular/core';

import { CharInitService } from './characters/char-init.service';

@Component({
  selector: 'wc-root',
  template: `
<div class="wc-root full-screen">
  <batatas-play-area></batatas-play-area>
</div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'world-citizen';
  constructor(
    private readonly _charInit: CharInitService,
  ) {}

  public async ngOnInit(): Promise<void> {
    // await this._charInit.initChars().toPromise();
  }
}
