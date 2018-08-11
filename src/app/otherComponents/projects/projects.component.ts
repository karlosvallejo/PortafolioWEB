import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}

class ProjectListNode implements ProjectList {
  nameOfProject: string;
  info: string;
  url: string;
 // node: Array<ProjectList>;

   /*
  constructor(nameOfProject: string, info: string, url: string, node?: Array<ProjectList>) {
    this.nameOfProject = nameOfProject;
    this.info = info;
    this.url = url;
    this.node = node || [];
  }
  */

  constructor(nameOfProject: string, info: string, url: string) {
    this.nameOfProject = nameOfProject;
    this.info = info;
    this.url = url;
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
 // node: Array<ProjectList>;
}
