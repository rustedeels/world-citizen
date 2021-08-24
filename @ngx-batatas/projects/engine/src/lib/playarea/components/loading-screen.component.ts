import {
  Component,
  OnInit,
} from '@angular/core';

import { getBatatas } from '../../core/core.utils';
import { LoaderService } from '../../data-loader/loader.service';
import { ProgressReport } from '../../data-loader/progress-report';
import {
  BatatasEventsMap,
  EventsService,
} from '../../events';
import { PlayAreaStateMachine } from '../../states';

@Component({
  selector: 'bt-loading-screen',
  template: `
<div class="bt-loading-screen full-screen flex flex-column">
  <div class="flex-grow-0 game-banner">
    <div class="image">
      <img src="/assets/icon.png" alt="Game icon" />
    </div>
    <div class="text">{{title}}</div>
  </div>
  <div class="flex-grow-1"></div>
  <div class="flex-grow-0 dev-banner">
    <div class="text">developed by <span>{{developer}}</span></div>
    <img src="/assets/logo.png" alt="Developer logo" />
  </div>
  <div class="flex-grow-0 flex flex-center">
    <div class="progress-bar">
      <div class="progress-bar__status" [ngStyle]="progressStyle"></div>
    </div>
  </div>
</div>
`
})
export class LoadingScreenComponent implements OnInit {
  public progress = 0;
  public readonly title: string;
  public readonly developer: string;

  public get progressStyle() {
    return {
      width: `${this.progress}%`,
    }
  }

  public constructor(
    private readonly _loader: LoaderService,
    private readonly _events: EventsService<BatatasEventsMap>,
    private readonly _state: PlayAreaStateMachine,
  ) {
    this.title = getBatatas('title');
    this.developer = getBatatas('developer');
  }

  public ngOnInit(): void {
    this.startLoading();
  }

  private async startLoading(): Promise<void> {
    var report = new ProgressReport();
    report.progress$.subscribe(p => this.setProgress(p.progress));
    await this._loader.load(report);
  }

  private setProgress(p: number) {
    this.progress = p;
    if (p === 100) {
      this._events.emit('engineReady');
      this._state.nextState('mainMenu');
    }
  }
}
