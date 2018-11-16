import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-full-screen-request',
  templateUrl: './full-screen-request.component.html',
  styleUrls: ['./full-screen-request.component.css']
})
export class FullScreenRequestComponent implements OnInit {

  docelem: any;


  constructor(private router: Router,  private deviceService: DeviceDetectorService) {
    this.docelem = document.documentElement;
  }

  ngOnInit() {


  }






  clicki() {
    if (this.deviceService.isMobile()) {
      if ('orientation' in screen) {
        if (this.docelem.requestFullscreen) {
          this.docelem.requestFullscreen();
        } else if (this.docelem.mozRequestFullScreen) {
          this.docelem.mozRequestFullScreen();
        } else if (this.docelem.webkitRequestFullScreen) {
          this.docelem.webkitRequestFullScreen();
        } else if (this.docelem.msRequestFullscreen) {
          this.docelem.msRequestFullscreen();
        }
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
