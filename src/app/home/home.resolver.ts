import { Injectable } from '@angular/core';

import {GeneralServiceService} from '../services/general-service.service';

import { Resolve } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';



@Injectable()
export class HomeResolver implements Resolve<Observable<any>> {


  constructor() { }

  resolve() {
    if (!GeneralServiceService.started) {
      return of([]);
    } else {
      return of([]).pipe(delay(3000));
    }
  }
}
