import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';




@Injectable()
export class SkillsResolver implements Resolve<Observable<any>> {



  constructor() { }

  resolve() {
    return of([]).pipe(delay(10000));
  }
}
