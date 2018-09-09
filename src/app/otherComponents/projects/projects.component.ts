import { Component, OnInit } from '@angular/core';
import {GeneralServiceService, ProjectList} from '../../services/general-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsArray: ProjectList[];
  activeProject: ProjectList;


  constructor(private data: GeneralServiceService) {
    this.projectsArray = data.projectsList;
    this.activeProject = new ProjectListNode('', '', '', '', []);
  }

  ngOnInit() {

        this.activeProject = this.projectsArray[0];

  }

  toggleProject(selected: ProjectList ): void {
    this.activeProject = selected;
  }


}

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

}

