import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy, AfterViewInit {
  // suscription: Subscription;
  activeSkill: number;
  skillsArray = [
    {
      title: 'JavaScript', image: '/assets/generalImages/Unofficial_JavaScript_logo_2.svg', description: 'Sin ' +
      'el, nada de esto fuera posible. Más allá de saber un framework en especifico, lo primero es aprender javascript; Por esto comencé ' +
      'el desarrollo front end usando javascript vanilla apoyado con Jquery, una vez domino ES5, comienzo con ES6, para ' +
      'despues mantenerme actualizado con las posteriores implementaciones. Después de dominar a ' +
      'un nivel suficiente este lenguaje, decido comenzar a aprender NodeJs y los demás frameworks tanto front end como' +
      ' back end. Ahora mismo utilizo Typescript para programar las aplicaciones.'
    },
    {
      title: 'Angular', image: '/assets/generalImages/angular_whiteTransparent.svg', description: 'Angular es mi principal ' +
      'framework de desarrollo front end, mi experiencia con Angular comienza en el 2017 para un ' +
      'proyecto universitario; Lo he continuado usando hasta hoy en dia como framework principal, pudiendo aprender y experimentar ' +
      'ampliamente con una gran parte de sus posibilidades'
    },
    {
      title: 'React', image: '/assets/generalImages/react_logo_white.svg', description: 'He utilizado React para algunos proyectos ' +
      'Universitarios, sin duda es una librería (Framework (?)) muy divertida de utilizar. En mi experiencia usando React junto ' +
      'con Mobx para el manejo de estados, he logrado desarrollar proyectos de una forma mas rápida y versátil, incluso mas de lo que ' +
      'esperaba en un principio.'
    },
    {
      title: 'React Native', image: '/assets/generalImages/native_logo.svg', description: 'A pesar de no poseer mucha experiencia ' +
        'con React Native y el desarrollo móvil en general, he hecho un acercamiento a este framework en un proyecto y mis sensaciones ' +
        'han sido bastante positivas, el poder desarrollar aplicaciones móviles usando Javascript, permite tener un workflow mas ágil en ' +
        'muchos casos.'
    }
  ];

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
