import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import {GeneralServiceService} from '../../services/general-service.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';



@Injectable()
export class AboutResolver implements Resolve<Observable<[Blob, Blob, Blob]>> {

  constructor(private general_service: GeneralServiceService) {  }

  resolve() {

  return forkJoin(this.general_service.getImage('https://firebasestorage.googleapis.com/v0/b/karlosinteractive.appspot.com/o/' +
    '%C3%ADndice.jpg?alt=media&token=c9d6b576-adfe-4e6a-86a0-d9a48353d49b'),
    this.general_service.getImage('https://firebasestorage.googleapis.com/v0/b/karlosinteractive.appspot.com/o/' +
      'Serah_Farron_Alt_Render.png?alt=media&token=43351ed9-25b4-4572-a275-84b1d3c8a30a'),
    this.general_service.getImage('https://firebasestorage.googleapis.com/v0/b/karlosinteractive.appspot.com/o/' +
      'Corpser_GOW_3.png?alt=media&token=ff9e41c4-0616-4f45-b399-96956e2c499b')).pipe(delay(2000));
  }
}
