import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {EventsService} from '../../services/events.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy, AfterViewInit {
  // suscription: Subscription;
  activeSkill: number;
  skillsArray = [{title: 'JavaScript', image: '/assets/generalImages/Unofficial_JavaScript_logo_2.svg', description: 'Sin ' +
      'el, nada de esto fuera posible. Más allá de saber un framework en especifico, lo primero es aprender javascript; Por esto comence' +
      ' el desarrollo front end usando javascript vanilla apoyado con Jquery, una vez domino ES5, comienzo con ES6. Despues de dominar a ' +
      'un nivel suficiente este lenguaje, decido comenzar a aprender NodeJs y los demas frameworks tanto front end como' +
      ' back end. Ahora mismo utilizo Typescript para programar las aplicaciones.'},
    {title: 'Angular', image: '/assets/generalImages/angular_whiteTransparent.svg', description: 'Angular es mi principal ' +
      'framework de desarrollo front end, mi experiencia con Angular (Angular 4 en ese momento) comienza en el 2017 para un ' +
      'proyecto universitario; Lo he continuado usando hasta hoy en dia como framework predilecto, pudiendo aprender y experimentar ' +
      'ampliamente con una gran parte de sus posiblilidades'}];

  constructor(private eventManager: EventsService) {
    this.activeSkill = 0;
  }

  ngOnInit() {


  }

  ngOnDestroy(): void {
    /*
    this.suscription.unsubscribe();
    */
  }

  ngAfterViewInit(): void {
    /*
    this.suscription = interval(20000).subscribe(x => {
        this.changeActiveSkill('next');
    });
    */
  }

  changeActiveSkill(direction: string): void {
    this.eventManager.newEvent('Wild');
    setTimeout(() => {
      this.eventManager.newEvent('noWild');
    }, 1000);

    switch (direction) {
      case 'next':
        if (this.activeSkill + 1 >= this.skillsArray.length) {
          this.activeSkill = 0;
        } else {
          this.activeSkill++;
        }
        break;
      case 'back':
        if (this.activeSkill - 1 < 0) {
          this.activeSkill = this.skillsArray.length - 1;
        } else {
          this.activeSkill--;
        }
        break;
    }
  }

}
