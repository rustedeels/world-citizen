import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import {
  CustomView,
  CustomViewOptions,
  CustomViewStore,
} from '../../../../custom-view/_index';
import { LoggerService } from '../../../../logger/logger.service';
import { GameEngineStateMachine } from '../../../../states';

@Component({
  selector: 'bt-custom-view',
  template: `
<div class="bt-custom-view layer__container">
  <div class="layer--level-1" >
    <ng-container #host ></ng-container>
  </div>
  <div class="layer--overlay">
    <div
      class="return"
      *ngIf="options.allowReturn"
      (click)="onReturn()"
    >X</div>
  </div>
</div>
`
})
export class CustomViewComponent implements AfterViewInit {
  private _currentView?: Type<CustomView<any>>;

  public options: CustomViewOptions = {
    allowReturn: true,
  };

  @ViewChild('host', { read: ViewContainerRef })
  public host!: ViewContainerRef;

  public constructor(
    private readonly _logger: LoggerService,
    private readonly _customView: CustomViewStore,
    private readonly _factoryResolver : ComponentFactoryResolver,
    private readonly _gameState: GameEngineStateMachine,
  ) {}

  public ngAfterViewInit(): void {
    this._customView.active
      .subscribe(view => {
        if (!view) {
          this._currentView = undefined;
          return;
        }
        setTimeout(() => {
          this.loadView(view[0], view[1]);
        }, 0);
      })
  }

  public onReturn(): void {
    this._gameState.prevState();
  }

  private async loadView(view: Type<CustomView<any>>, params?: any) {
    if (view === this._currentView) return;
    this._currentView = view;
    const factory = this._factoryResolver.resolveComponentFactory(view);
    const ref = this.host.createComponent(factory);
    this._logger.engine('Loaded custom view', ref.instance.name, params);
    await ref.instance.onReady(params);
    this.options = ref.instance.options;
  }
}
