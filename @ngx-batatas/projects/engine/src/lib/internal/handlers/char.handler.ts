import { Injectable } from '@angular/core';

import {
  CharAttributes,
  CoreAttr,
} from '../../attr/attr.model';
import { AttributeService } from '../../attr/attr.service';
import { CharAttributesStore } from '../../attr/char-attr.store';
import {
  BodyParts,
  BodyStore,
  CharBody,
  EquipSlot,
} from '../../body';
import { BodyPartId } from '../../body-part';
import { BodyPartService } from '../../body-part/body-part.service';
import {
  Char,
  CharInit,
} from '../../char/char.model';
import { CharStore } from '../../char/char.store';
import { EventHandler } from '../../events/decorator';
import { LoggerService } from '../../logger/logger.service';
import { getDateString } from '../../tools/date.tools';

@Injectable()
export class CharEventsHandler {

  public constructor(
    private readonly _logger: LoggerService,
    private readonly _charStore: CharStore,
    private readonly _bodyParts: BodyPartService<BodyPartId>,
    private readonly _bodyStore: BodyStore,
    private readonly _attr: AttributeService<CoreAttr>,
    private readonly _attrStore: CharAttributesStore<CoreAttr>,
  ) {}

  @EventHandler('charInit')
  public onCharInit(init?: CharInit | CharInit[]): void {
    if (!init) {
      this._logger.warning('An empty char init was emited');
      return;
    }

    const charList: [Char, CharInit][] = (Array.isArray(init) ? init : [init])
      .map(c => ([{
        id: c.id,
        name: c.name,
        portrait: '',
        birth: getDateString(c.birth),
        gender: c.gender,
        surname: c.surname,
      }, c]))

    for (const [char, i] of charList) {
      const body = this.buildBody(i.id, i.body);
      const attr = this.getCoreAttributes(i.id);

      this._charStore.add(char);
      this._bodyStore.add(body);
      this._attrStore.add(attr);
      this._charStore.setPortrait(char.id, i.resourceId);
    }
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

  private getCoreAttributes(id: string): CharAttributes<CoreAttr> {
    return {
      id,
      attr: {
        strength: this._attr.getAttribute('strength'),
        endurance: this._attr.getAttribute('endurance'),
        agility: this._attr.getAttribute('agility'),
        intelligence: this._attr.getAttribute('intelligence'),
        charisma: this._attr.getAttribute('charisma'),
        openess: this._attr.getAttribute('openess'),
        dominance: this._attr.getAttribute('dominance'),
        submission: this._attr.getAttribute('submission'),
      }
    }
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
