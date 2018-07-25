import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';



@Injectable()
export class DelayResolver implements Resolve<Observable<string>> {
  constructor() {}

  resolve() {
    return of('fk up u').pipe(delay(3000));
  }
}
