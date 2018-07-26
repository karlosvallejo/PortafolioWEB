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

  constructor(private route: ActivatedRoute) {
    this.drone = 'https://vignette.wikia.nocookie.net/gearsofwar/images/2/22/Drone_GOW_3.png/revision' +
    '/latest/scale-to-width-down/1000?cb=20171217220240&path-prefix=es';
  }

  ngOnInit() {
    this.data = this.route.snapshot.data.imagenes;
    GeneralServiceService.convertBlobToBase64(this.data[0]).then(base64 => this.drone = base64);
    this.data.forEach(images => {
     // GeneralServiceService.convertBlobToBase64(images).then(base64 => console.log(base64));
    });



  }
}
