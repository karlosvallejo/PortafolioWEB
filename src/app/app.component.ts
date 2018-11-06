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
  isFullScreen: boolean;
  actualRoute: string;
  actualDescription: string;



  constructor(private router: Router, private serviceEvents: EventsService) {
    this.title = 'Hominid Interactive';
    this.isFullScreen = false;
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
         this.send('loading');
          break;
        }

        case event instanceof NavigationEnd: {
          switch ((<NavigationEnd>event).url) {
            case '/welcome':
              this.actualRoute = 'START';
              this.actualDescription = 'INTRODUCTION TO THE SYSTEM';
              break;

            case '/REstORinG/ABoUT':
              this.actualRoute = 'WHO IS';
              this.actualDescription = 'CARLOS GOMEZ';
              break;

            case '/REstORinG/SkIlLs':
              this.actualRoute = 'KNOW';
              this.actualDescription = 'THE POWERS';
              break;

            case '/REstORinG/ProJEcTs':
              this.actualRoute = 'SEE';
              this.actualDescription = 'THE ARSENAL';
              break;
          }
          this.send('endLoading');
          break;
        }

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
    document.addEventListener('fullscreenchange', () => this.FShandler());
    document.addEventListener('webkitfullscreenchange', () => this.FShandler());
    document.addEventListener('mozfullscreenchange', () => this.FShandler());
    document.addEventListener('MSFullscreenChange', () => this.FShandler());
  }


  FShandler() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      this.router.navigate(['welcome']);
    } else {
      this.router.navigate(['']);
    }
  }

}
