import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-full-screen-request',
  templateUrl: './full-screen-request.component.html',
  styleUrls: ['./full-screen-request.component.css']
})
export class FullScreenRequestComponent implements OnInit {

  docelem: any ;
  isFullScreen: boolean;

  constructor(private router: Router) {
    this.docelem = document.documentElement;
    this.isFullScreen = false;
  }

  ngOnInit() {

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



  clicki() {

    if ('orientation' in screen) {
      if (this.docelem.requestFullscreen) {
        this.docelem.requestFullscreen();
      } else
      // @ts-ignore
      if (this.docelem.mozRequestFullScreen) {
        // @ts-ignore
        this.docelem.mozRequestFullScreen();
      } else if (this.docelem.webkitRequestFullScreen) {
        this.docelem.webkitRequestFullScreen();
      } else
      // @ts-ignore
      if (this.docelem.msRequestFullscreen) {
        // @ts-ignore
        this.docelem.msRequestFullscreen();
      }
      // @ts-ignore
      screen.orientation.lock('landscape-primary');
    } else {
      console.log('no-soportado');
    }
  }

}
