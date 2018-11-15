import { Component, OnInit } from '@angular/core';
import {ProjectList} from '../../services/general-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsArray: ProjectList[];
  activeProject: ProjectList;


  constructor(private router: ActivatedRoute) {
    this.projectsArray = this.router.snapshot.data['proyectos'];

  }

  ngOnInit() {
    this.activeProject = this.projectsArray[0];
  }

  toggleProject(selected: ProjectList ): void {
    this.activeProject = selected;
  }


}
/*
class ProjectListNode implements ProjectList {
  nameOfProject: string;
  info: string;
  url: string;
  kind: string;
  projectImages: Array<string>;


  constructor(nameOfProject: string, info: string, url: string, kind: string, images: Array<string>) {
    this.nameOfProject = nameOfProject;
    this.info = info;
    this.url = url;
    this.kind = kind;
    this.projectImages = images;
  }

  github: string;

}
*/

