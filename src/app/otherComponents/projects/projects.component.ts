import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsArray: ProjectListNode[];
  activeProject: ProjectListNode;


  constructor() {
    this.projectsArray = [new ProjectListNode('EcoInteractive', 'Proyecto realizado en el curso Ambientes Inteligentes con ' +
      'el objetivo de fomentar conocimiento sobre las labores medioambientales de smurfit kappa. Para el prototipo de creo ' +
      'una version del famoso juego "El Sapo", donde la informacion era mostrada a partir de las interacciones del usuario, se utilizo ' +
      'un arduino, una raspberry pi, diodos infrarrojos y una pantalla externa.',
      'https://eco-interactive.firebaseapp.com/', 'PROGRAMMING', ['/assets/generalImages/projects/kappa0.PNG',
        '/assets/generalImages/projects/kappa1.PNG', '/assets/generalImages/projects/kappa2.PNG']), new ProjectListNode('Hoy es Diseño',
      'Pues la web de hed bro', 'hed.com', 'WEB', ['/assets/generalImages/projects/kappa0.PNG']),
      new ProjectListNode('EcoInteractive', 'un proyecto interactvo de papus para papus',
      'https://eco-interactive.firebaseapp.com/', 'PROGRAMMING', ['/assets/generalImages/projects/kappa0.PNG',
          '/assets/generalImages/projects/kappa1.PNG'])
    ];
  }

  ngOnInit() {
    this.activeProject = this.projectsArray[0];
  }

  toggleProject(selected: ProjectListNode ): void {
    this.activeProject = selected;
  }


}

class ProjectListNode implements ProjectList {
  nameOfProject: string;
  info: string;
  url: string;
  kind: string;
  projectImages: Array<string>;
 // node: Array<ProjectList>;

   /*
  constructor(nameOfProject: string, info: string, url: string, node?: Array<ProjectList>) {
    this.nameOfProject = nameOfProject;
    this.info = info;
    this.url = url;
    this.node = node || [];
  }
  */

  constructor(nameOfProject: string, info: string, url: string, kind: string, images: Array<string>) {
    this.nameOfProject = nameOfProject;
    this.info = info;
    this.url = url;
    this.kind = kind;
    this.projectImages = images;
  }
/*
  addNode(node: ProjectList): void {
    this.node.push(node);
  }
*/
}


interface ProjectList {
  nameOfProject: string;
  info: string;
  url: string;
  kind: string;
  projectImages: Array<string>;
 // node: Array<ProjectList>;
}
