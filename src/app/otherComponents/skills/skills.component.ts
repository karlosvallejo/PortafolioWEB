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
      title: 'Angular', image: '/assets/generalImages/angular_whiteTransparent.svg', description: 'He utilizado Angular en varios ' +
        'proyectos universitarios, incluyendo este portafolio. Aunque hace algún tiempo dejó de ser mi herramienta principal, sigo ' +
        'reconociendo su poder para el desarrollo de aplicaciones web.'
    },
    {
      title: 'React', image: '/assets/generalImages/react_logo_white.svg', description: 'Actualmente es mi librería favorita para ' +
        'incluir en mis aplicaciones web y móviles, su gran versatilidad, ecosistema y comunidad hace que recobre mi fe en la ' +
        'humanidad (y en Facebook).'
    },
    {
      title: 'React Native', image: '/assets/generalImages/native_logo.svg', description: 'React Native me parece la fantasia de la ' +
        'década, ¿Poder desarrollar aplicaciones para numerosas plataformas con una misma base de código, que optimizando bien puede ' +
        'dar un rendimiento nativo en muchos casos y que ademas es basada en javascript? Para mí esto es magia. Este es el framework ' +
        'con el que mas experiencia tengo y lo utilizo para desarrollar todas mis aplicaciones móviles.'
    },
    {
      title: 'Otras Tecnologías', image: '/assets/generalImages/redux-logo-black-and-white.png', description: 'Para concluir, tengo ' +
        'experiencia en varias librerías y herramientas, tales como nodeJs, firebase, maps de google, google cloud, AWS, ' +
        'styled components, redux, JWT, ReasonML y muchas otras tecnologías disponibles en el mundo de la web.'
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
