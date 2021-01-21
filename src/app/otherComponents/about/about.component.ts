import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {convertBlobToBase64} from '../../services/general-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  /*
  data: string[];
  drone: string;
  droneTwo: string;
  droneThree: string;
  */
  text: string;
  textPersonalSkills: string;

  constructor(private route: ActivatedRoute) {
    this.textPersonalSkills = 'I am Carlos, <strong>Interactive Media Designer</strong> and Overwatch fan. I am currently ' +
      'based in Cali, Colombia. I am interested in Javascript development in general, design and full-stack programming of ' +
      'web and mobile applications with the possibility of integrating <strong>interactive content</strong>. ' +
      'The skills of <strong>responsibility</strong>, the ability to <strong>learn</strong>, the ability to ' +
      '<strong>seek information</strong>, <strong>analytical thinking</strong> and ' +
      '<strong>results orientation</strong> have guided my career being able to obtain good results in the projects I have worked on.';

    this.text = 'I consider that this is a platform in which you can develop almost without limits and has by nature  a very great ' +
      'potential. Throughout my career I have acquired different skills such as interface design, game design, programming skills, ' +
      'and other related knowledge, which I try to use in projects to provide a more complete and enriched user experience.';
    /*
    this.drone = '';
    this.droneTwo = '';
    this.droneThree = '';
    */
  }

  ngOnInit() {
    /*
    this.data = this.route.snapshot.data['imagenes'];
    console.log(this.data);

    this.drone = this.data[0];
    this.droneTwo = this.data[1];
    this.droneThree =  this.data[2];
    */
    /*
    convertBlobToBase64(this.data[0]).then(base64 => this.drone = base64);
    convertBlobToBase64(this.data[1]).then(base64 => this.droneTwo = base64);
    convertBlobToBase64(this.data[2]).then(base64 => this.droneThree = base64);
    */
    /*
    this.data.forEach((images: Blob) => {
     // GeneralServiceService.convertBlobToBase64(images).then(base64 => console.log(base64));
    });
    */
  }
}
