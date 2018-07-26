import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import {GeneralServiceService} from '../../services/general-service.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';



@Injectable()
export class AboutResolver implements Resolve<Observable<[Blob, Blob]>> {

  constructor(private general_service: GeneralServiceService) {  }

  resolve() {

  return forkJoin(this.general_service.getImage('https://vignette.wikia.nocookie.net/gearsofwar/images/2/22/Drone_GOW_3.png/revision' +
    '/latest/scale-to-width-down/1000?cb=20171217220240&path-prefix=es'),
    this.general_service.getImage('https://vignette.wikia.nocookie.net/gearsofwar/images/2/22/Drone_GOW_3.png/revision' +
    '/latest/scale-to-width-down/1000?cb=20171217220240&path-prefix=es')).pipe(delay(2000));
  }
}
