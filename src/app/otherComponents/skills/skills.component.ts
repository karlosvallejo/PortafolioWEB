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
      title: 'JavaScript', image: '/assets/generalImages/Unofficial_JavaScript_logo_2.svg', description: 'Without it, none of this would ' +
        'be possible. Beyond mastering a specific framework, the first thing is to learn javascript; that is why I started with front ' +
        'end development using vanilla javascript supported with Jquery, when I learned ES5, I start with ES6, and then I keep ' +
        'updated with the later iterations. After learning at a good level this language, I decide to start learning NodeJs and the ' +
        'other frameworks both frontend and backend. Right now I use Typescript and React/React Native to build frontend applications.'
    },
    {
      title: 'Angular', image: '/assets/generalImages/angular_whiteTransparent.svg', description: 'I have used Angular in several ' +
        'college projects, including this portfolio. Although it stopped being my main tool some time ago, I still recognize its ' +
        'power for web application development.'
    },
    {
      title: 'React', image: '/assets/generalImages/react_logo_white.svg', description: 'It is currently my favorite and default ' +
        'library to include in my web and mobile applications, its great versatility, ecosystem and community makes the development ' +
        'on this library very comfortable and efficient.'
    },
    {
      title: 'React Native', image: '/assets/generalImages/native_logo.svg', description: 'I think React Native is the fantasy of the ' +
        'decade. Being able to develop apps for many platforms with the same code base, that by optimizing well can give you native ' +
        'performance in many cases, and that is also javascript based? For me this is magic. This is the framework with which I have ' +
        'more experience and I use it to develop all my mobile applications.'
    },
    {
      title: 'Otras Tecnologías', image: '/assets/generalImages/redux-logo-black-and-white.png', description: 'Finally, I have ' +
        'experience in several libraries and tools, such as nodeJs, firebase, google maps, google cloud, AWS, styled components, ' +
        'redux, JWT, ReasonML and many other technologies available in the web ecosystem.'
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
