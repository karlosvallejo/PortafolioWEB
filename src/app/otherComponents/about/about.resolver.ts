import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import {delay} from 'rxjs/operators';
import {convertBlobToBase64, GeneralServiceService} from '../../services/general-service.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {Observable, of} from 'rxjs';
import {promise} from 'selenium-webdriver';



@Injectable()
export class AboutResolver implements Resolve<string[]> {

  constructor(private general_service: GeneralServiceService) {  }

  resolve() {
    return of([]).pipe(delay(5000));
  }



  /*
  resolve(): Promise<string[]> {


  return new Promise<[string, string, string]>((resolve) => {
    forkJoin(this.general_service.getImage('https://firebasestorage.googleapis.com/v0/b/karlosinteractive.appspot.com/o/' +
      '%C3%ADndice.jpg?alt=media&token=c9d6b576-adfe-4e6a-86a0-d9a48353d49b'),
      this.general_service.getImage('https://firebasestorage.googleapis.com/v0/b/karlosinteractive.appspot.com/o/' +
        'Serah_Farron_Alt_Render.png?alt=media&token=43351ed9-25b4-4572-a275-84b1d3c8a30a'),
      this.general_service.getImage('https://firebasestorage.googleapis.com/v0/b/karlosinteractive.appspot.com/o/' +
        'Corpser_GOW_3.png?alt=media&token=ff9e41c4-0616-4f45-b399-96956e2c499b')).toPromise().then((data) => {
       forkJoin(convertBlobToBase64(data[0]), convertBlobToBase64(data[1]), convertBlobToBase64(data[2])).toPromise().then(
         (imagesBase64) => {
         resolve(imagesBase64);
       });
    });
  });
  }
  */
}
