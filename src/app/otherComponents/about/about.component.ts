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
    this.textPersonalSkills = 'Soy estudiante de <strong>Diseño de Medios Interactivos</strong>, actualmente me encuentro en Cali, ' +
      'Colombia. Me interesa el desarrollo Javascript en general, por ejemplo el diseño y programación full-stack de aplicaciones ' +
      'web, con la posibilidad de integrar <strong>contenido interactivo</strong> 2D/3D tales como videojuegos o similares. ' +
      'Las facultades de la <strong>responsabilidad</strong>, la capacidad de <strong>aprender</strong>, el buscar ' +
      '<strong>información adicional</strong>, el <strong>pensamiento analítico</strong> y la orientación a ' +
      '<strong>resultados</strong> han marcado mi carrera universitaria pudiendo obtener buenos resultados en los proyectos emprendidos.';

    this.text = 'Considero que esta es una una plataforma en la que se puede desarrollar casi sin ' +
      'límites y que cuenta por naturaleza con un alcance muy amplio. A lo largo de la carrera he adquirido diferentes conocimientos ' +
      'como es el caso del diseño de interfaces, diseño de experiencia de usuario, diseño de videojuegos, entre otros, los cuales ' +
      'procuro utilizar en los proyectos para brindar una experiencia más completa y enriquecida al usuario.';
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
