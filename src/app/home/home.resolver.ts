import { Injectable } from '@angular/core';


import {NavigationEnd, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';




@Injectable()
export class HomeResolver implements Resolve<Observable<any>> {

  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  resolve() {
    if (this.currentUrl === '/') {
      this.currentUrl = 'cualquierOtra';
      return of([]);
    } else {
      return of([]).pipe(delay(3000));
    }
  }
}
