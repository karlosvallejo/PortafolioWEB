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
  isFullScreen = false;



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
    document.addEventListener('fullscreenchange', this.FShandler);
    document.addEventListener('webkitfullscreenchange', this.FShandler);
    document.addEventListener('mozfullscreenchange', this.FShandler);
    document.addEventListener('MSFullscreenChange', this.FShandler);
  }

  FShandler = () => {
    this.isFullScreen = !this.isFullScreen;
    console.log(this.isFullScreen);
  }


  clicki() {
    const docelem = document.documentElement;
      if ('orientation' in screen) {
        if (docelem.requestFullscreen) {
          docelem.requestFullscreen();
        } else
        // @ts-ignore
        if (docelem.mozRequestFullScreen) {
          // @ts-ignore
          docelem.mozRequestFullScreen();
        } else if (docelem.webkitRequestFullScreen) {
          docelem.webkitRequestFullScreen();
        } else
        // @ts-ignore
         if (docelem.msRequestFullscreen) {
          // @ts-ignore
          docelem.msRequestFullscreen();
        }
        // @ts-ignore
        screen.orientation.lock('landscape-primary');
      } else {
        console.log('no-soportado');
      }
  }
}
