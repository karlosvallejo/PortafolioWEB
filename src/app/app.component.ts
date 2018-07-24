import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  loading: boolean;

  constructor(private router: Router) {

    this.loading = false;
    this.title = 'Hominid Interactive';

     this.router.events.subscribe((event: RouterEvent) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;

            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof  NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
     });
  }
}
