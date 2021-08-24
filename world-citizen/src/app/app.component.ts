

import {
  Component,
  OnInit,
} from '@angular/core';

import { CharInitService } from './characters/char-init.service';

@Component({
  selector: 'wc-root',
  template: `
<batatas-play-area></batatas-play-area>
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
