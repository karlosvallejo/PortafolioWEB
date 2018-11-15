import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-full-screen-request',
  templateUrl: './full-screen-request.component.html',
  styleUrls: ['./full-screen-request.component.css']
})
export class FullScreenRequestComponent implements OnInit {

  docelem: HTMLElement;


  constructor(private router: Router,  private deviceService: DeviceDetectorService) {
    this.docelem = document.documentElement;
  }

  ngOnInit() {


  }






  clicki() {

    /*
    if (this.deviceService.isMobile()) {
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
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['welcome']);
    }
    */

    if (this.deviceService.isMobile()) {
      if ('orientation' in screen) {
        if (this.docelem.requestFullscreen) {
          this.docelem.requestFullscreen();
        }
        // @ts-ignore
        screen.orientation.lock('landscape-primary');
      } else {
        console.log('no-soportado');
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['welcome']);
    }

  }

}
