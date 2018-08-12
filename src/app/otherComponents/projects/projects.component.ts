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
    this.projectsArray = [new ProjectListNode('EcoInteractive', 'un proyecto interactvo de papus para papus',
      'https://eco-interactive.firebaseapp.com/', 'PROGRAMMING'), new ProjectListNode('Hoy es Diseño',
      'Pues la web de hed bro', 'hed.com', 'WEB'), new ProjectListNode('EcoInteractive', 'un proyecto interactvo de papus para papus',
      'https://eco-interactive.firebaseapp.com/', 'PROGRAMMING'),  new ProjectListNode('Hoy es Diseño',
      'Pues la web de hed bro', 'hed.com', 'WEB'), new ProjectListNode('EcoInteractive', 'un proyecto interactvo de papus para papus',
      'https://eco-interactive.firebaseapp.com/', 'PROGRAMMING'), new ProjectListNode('Hoy es Diseño',
      'Pues la web de hed bro', 'hed.com', 'WEB'), new ProjectListNode('EcoInteractive', 'un proyecto interactvo de papus para papus',
      'https://eco-interactive.firebaseapp.com/', 'PROGRAMMING'), new ProjectListNode('Hoy es Diseño',
      'Pues la web de hed bro', 'hed.com', 'WEB'), new ProjectListNode('EcoInteractive', 'un proyecto interactvo de papus para papus',
      'https://eco-interactive.firebaseapp.com/', 'PROGRAMMING'), new ProjectListNode('Hoy es Diseño',
      'Pues la web de hed bro', 'hed.com', 'WEB')];
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
 // node: Array<ProjectList>;

   /*
  constructor(nameOfProject: string, info: string, url: string, node?: Array<ProjectList>) {
    this.nameOfProject = nameOfProject;
    this.info = info;
    this.url = url;
    this.node = node || [];
  }
  */

  constructor(nameOfProject: string, info: string, url: string, kind: string) {
    this.nameOfProject = nameOfProject;
    this.info = info;
    this.url = url;
    this.kind = kind;
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
 // node: Array<ProjectList>;
}
