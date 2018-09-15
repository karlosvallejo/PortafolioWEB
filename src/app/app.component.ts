import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {EventsService} from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title: string;



  constructor(private router: Router, private serviceEvents: EventsService) {

    this.title = 'Hominid Interactive';
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
         this.send('loading');
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof  NavigationError: {
         // setTimeout(() => { // here
           this.send('endLoading');
         // }, 5000);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  send(message: string) {
    this.serviceEvents.newEvent(message);
  }

  ngOnInit(): void {

  }

}
