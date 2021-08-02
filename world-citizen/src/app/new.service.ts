import { Injectable } from '@angular/core';
import { EventHandler } from '@ngx-batatas/engine';

@Injectable()
export class NewService {
  @EventHandler('engineInit')
  public handle() {
    console.log('was handled by new');
  }
}
