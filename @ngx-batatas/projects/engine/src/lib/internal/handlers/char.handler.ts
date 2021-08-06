import { Injectable } from '@angular/core';

import { BodyParts, BodyStore, CharBody, EquipSlot } from '../../body';
import { BodyPartId } from '../../body-part';
import { BodyPartService } from '../../body-part/body-part.service';
import { Char, CharInit } from '../../char/char.model';
import { CharStore } from '../../char/char.store';
import { EventHandler } from '../../events/decorator';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class CharEventsHandler {

  public constructor(
    private readonly _logger: LoggerService,
    private readonly _charStore: CharStore,
    private readonly _bodyParts: BodyPartService<BodyPartId>,
    private readonly _bodyStore: BodyStore,
  ) {}

  @EventHandler('charInit')
  public onCharInit(init?: CharInit): void {
    if (!init) {
      this._logger.warning('An empty char init was emited');
      return;
    }

    const char: Char = {
      id: init.id,
      name: init.name,
      portrait: '',
    }
    const body = this.buildBody(init.id, init.body);

    this._charStore.add(char);
    this._bodyStore.add(body);
    this._charStore.setPortrait(char.id, init.resourceId);
  }

  private buildBody(id: string, parts?: BodyPartId[]): CharBody {
    const bodyParts: BodyParts = this.getDefaultBodyParts();
    for (const id of parts ?? []) {
      const p = this._bodyParts.getBodyPart(id);
      bodyParts[p.type] = p;
    }

    return {
      id,
      parts: bodyParts,
      equipment: this.getDefaultBodyEquipment(),
    };
  }

  private getDefaultBodyParts(): BodyParts {
    return {
      body: this._bodyParts.getBodyPart('bodyFemale'),
      hair: this._bodyParts.getBodyPart('longHair'),
      eyes: this._bodyParts.getBodyPart('eyes'),
      ears: this._bodyParts.getBodyPart('ears'),
      mouth: this._bodyParts.getBodyPart('mouth'),
      nose: this._bodyParts.getBodyPart('nose'),
      tits: this._bodyParts.getBodyPart('tits'),
      hands: this._bodyParts.getBodyPart('hands'),
      feet: this._bodyParts.getBodyPart('feet'),
      anus: this._bodyParts.getBodyPart('anus'),
      gen: this._bodyParts.getBodyPart('pussy'),
    }
  }

  private getDefaultBodyEquipment(): EquipSlot {
    return {
      body: [0],
      hair: [0],
      eyes: [0],
      ears: [0],
      mouth: [0],
      nose: [0],
      tits: [0],
      hands: [0],
      feet: [0],
      anus: [0],
      gen: [0],
    }
  }
}
