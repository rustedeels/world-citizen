import { Component } from '@angular/core';
import {
  Char,
  CharQuery,
  CharStore,
  CustomView,
  CustomViewOptions,
  GameEngineStateMachine,
  PLAYER_ID,
} from '@ngx-batatas/engine';

@Component({
  template: `
<div class="wc-player-config full-screen">
  <bt-avatar class="avatar" ></bt-avatar>
  <div class="control__container">
    <bt-input
      label="Name"
      [width]="controlWidth"
      [(value)]="fname"
    ></bt-input>
    <bt-input
      label="Surname"
      [width]="controlWidth"
      [(value)]="sname"
    ></bt-input>
  </div>
  <div class="buttons__container">
    <bt-button
      [width]="controlWidth"
      [isEnabled]="valid"
      (press)="goBack()"
    >Save</bt-button>
  </div>
</div>
`,
})
export class PlayerConfigComponent implements CustomView<string> {
  public name = 'playerConfig';
  public options: CustomViewOptions = {
    allowReturn: false,
  };
  public controlWidth = '12.5rem';

  // ------ PROPS ---------------
  private _fname = '';
  private _sname = '';

  public get fname() { return this._fname; }
  public get sname() { return this._sname; }

  public set fname(v: string | undefined) {
    if (v === this._fname) return;
    this._fname = v || '';
    this.updateChar({ name: this._fname });
  }
  public set sname(v: string | undefined) {
    if (v === this._sname) return;
    this._sname = v || '';
    this.updateChar({ surname: this._sname });
  }
  // ------ PROPS ---------------

  public get valid() {
    return !!(this.fname && this.sname);
  }

  public constructor(
    private readonly _charQuery: CharQuery,
    private readonly _charStore: CharStore,
    private readonly _state: GameEngineStateMachine,
  ) {}

  public async onReady(): Promise<void> {
    setTimeout(() => {
      this._charQuery.selectEntity(PLAYER_ID)
        .subscribe(c => this.updateCharInfo(c));
    }, 0);
  }

  public goBack(): void {
    this._state.prevState();
  }

  private updateCharInfo(c?: Char): void {
    if (!c) return;

    this._fname = c.name;
    this._sname = c.surname;
  }

  private updateChar(c: Partial<Char>): void {
    this._charStore.update(PLAYER_ID, c);
  }
}
