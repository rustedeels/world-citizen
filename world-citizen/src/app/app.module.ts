import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    EngineModule, EvaluatorModule, EventsModule, LoggerModule, LogLevel, Resource, ResourcesModule,
} from '@ngx-batatas/engine';

import { AppComponent } from './app.component';
import { HandlerService } from './handler.service';
import { NewModule } from './new.module';
import { ResourceCountEval2 } from './res-count.eval';

const res: Resource[] = [{
  id: '9aadc908-1758-486e-93b0-de9e883e46f7',
  path: '/assets/batatas/pgr.img',
  tags: [],
  type: 'image'
},{
  id: '9aadc908-1758-486e-93b0-de9e883dasdsa',
  path: '/assets/batatas/pgr.img',
  tags: [],
  type: 'image'
},{
  id: '918e6604-8e07-4552-8929-6d23cba67d6a',
  path: '/assets/batatas/pgr.img',
  tags: [],
  type: 'image'
},{
  id: '3d99c749-0b2b-4964-9b7f-efaf06faa7f3',
  path: '/assets/batatas/pgr.img',
  tags: [],
  type: 'image'
},{
  id: 'b3401297-a51d-46b2-ba69-7a3bc1eb4984',
  path: '/assets/batatas/pgr.img',
  tags: [],
  type: 'image'
},{
  id: 'ac908c5b-a7d1-4a7c-b71f-f8c94896db93',
  path: '/assets/batatas/pgr.img',
  tags: [],
  type: 'image'
},{
  id: 'c350fcfa-6e1e-4782-bee6-3de1fd533d6c',
  path: '/assets/batatas/pgr.img',
  tags: [],
  type: 'image'
}]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NewModule,
    ResourcesModule.forResource(res),
    EventsModule.forHandlers([HandlerService]),
    LoggerModule.forLevel(LogLevel.all, true),
    EvaluatorModule.forEvaluators([ResourceCountEval2]),
    EngineModule.forRoot(environment.production),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
