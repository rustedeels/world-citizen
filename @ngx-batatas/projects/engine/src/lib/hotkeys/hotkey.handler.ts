import { EventsService } from '../events/events.service';
import { LoggerService } from '../logger/logger.service';
import {
  HotkeyBuilder,
  HotkeyMap,
  HotkeyProp,
  HotkeyTarget,
  HotkeyTrack,
  serializeHotkey,
} from './hotkeys.model';

export abstract class HotkeyHandler {
  private readonly __map: HotkeyMap = {};
  private readonly __track: HotkeyTrack = {};

  private __target?: HotkeyTarget;

  private KEY_UP_LISTNER: EventListener = (ev: Event) => this.handleKeyup(ev as KeyboardEvent);
  private KEY_DOWN_LISTNER: EventListener = (ev: Event) => this.handleKeydown(ev as KeyboardEvent);

  protected constructor(
    protected readonly _events: EventsService<any>,
    protected readonly _logger: LoggerService,
  ) {}

  public addHotkey(builder: Partial<HotkeyBuilder>): void {
    const b: HotkeyBuilder = {
      preventDefault: false,
      keys: [],
      event: '',
      ...builder,
    };

    if (!b.keys.length || !b.event.trim()) {
      this._logger.warning('Invalid hotkey', builder)
      return;
    }

    this.__map[serializeHotkey(b)] = {
      event: b.event,
      preventDefault: b.preventDefault,
    };
  }

  public setTarget(elem?: HotkeyTarget): void {
    this.__target?.removeEventListener('keyup', this.KEY_UP_LISTNER);
    this.__target?.removeEventListener('keydown', this.KEY_DOWN_LISTNER);
    this.__target = elem;
    this.__target?.addEventListener('keyup', this.KEY_UP_LISTNER);
    this.__target?.addEventListener('keydown', this.KEY_DOWN_LISTNER);

    if (elem) {
      this._logger.engine('Hotkey listner add to:', elem);
    } else {
      this._logger.engine('Hotkey listner removed');
    }
  }

  protected handleKeyup(ev: KeyboardEvent): void {
    if (!ev.key) return;
    this.track(ev, false);
  }

  protected handleKeydown(ev: KeyboardEvent): void {
    if (!ev.key || ev.repeat) return;
    this.track(ev, true);
    const hotkey = this.getKey();
    if (!hotkey) return;
    if (hotkey.preventDefault) {
      ev.preventDefault();
    }
    this._events.emit(hotkey.event);
  }

  private track(ev: KeyboardEvent, state: boolean): void {
    this.__track[ev.key.toLowerCase()] = state;
  }

  private getKey(): HotkeyProp | undefined {
    const builder: HotkeyBuilder = {
      preventDefault: false,
      event: '',
      keys: this.getTrackedKeys(),
    }
    const id = serializeHotkey(builder);
    return this.__map[id];
  }

  private getTrackedKeys(): string[] {
    return Object.entries(this.__track)
      .filter(e => !!e[1])
      .map(e => e[0]);
  }
}
