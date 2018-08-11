import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _subject: Subject<any>;

  constructor() {
    this._subject = new Subject<any>();
  }

  newEvent(event) {
    this._subject.next(event);
  }

  get events$ () {
    return this._subject.asObservable();
  }

}
