import {AfterViewInit, Component} from '@angular/core';
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
export class AppComponent implements AfterViewInit{
  title: string;
  loading: boolean;

  constructor(private router: Router) {
    this.loading = true;
    this.title = 'Hominid Interactive';
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;

          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof  NavigationError: {
         // setTimeout(() => { // here
            this.loading = false;
         // }, 5000);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
