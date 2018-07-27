import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {GeneralServiceService} from '../../services/general-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  data: Observable<Blob>;
  drone: string;
  droneTwo: string;
  droneThree: string;

  constructor(private route: ActivatedRoute) {
    this.drone = '';
    this.droneTwo = '';
    this.droneThree = '';
  }

  ngOnInit() {
    this.data = this.route.snapshot.data.imagenes;
    GeneralServiceService.convertBlobToBase64(this.data[0]).then(base64 => this.drone = base64);
    GeneralServiceService.convertBlobToBase64(this.data[1]).then(base64 => this.droneTwo = base64);
    GeneralServiceService.convertBlobToBase64(this.data[2]).then(base64 => this.droneThree = base64);
    this.data.forEach((images: Blob) => {
     // GeneralServiceService.convertBlobToBase64(images).then(base64 => console.log(base64));
    });
  }
}
