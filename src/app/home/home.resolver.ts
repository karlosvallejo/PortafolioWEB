import { Injectable } from '@angular/core';

import {GeneralServiceService} from '../services/general-service.service';

import { Resolve } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';



@Injectable()
export class HomeResolver implements Resolve<Observable<any>> {
firstInit: boolean;

  constructor() { this.firstInit = false; }

  resolve() {
    if (!this.firstInit) {
      this.firstInit = true;
      return of('toca');
    } else {
      return of('toca').pipe(delay(3000));
    }
  }
}
