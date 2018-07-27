import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AboutComponent} from './about/about.component';
import {SkillsComponent} from './skills/skills.component';
import {ProjectsComponent} from './projects/projects.component';
import {AboutResolver} from './about/about.resolver';

const routes: Routes = [
  { path: 'ABoUT', component: AboutComponent, resolve: {imagenes : AboutResolver}, pathMatch: 'full'  },
  { path: 'SkIlLs', component: SkillsComponent, pathMatch: 'full' },
  { path: 'ProJEcTs', component: ProjectsComponent, pathMatch: 'full'  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutComponent,
    SkillsComponent,
    ProjectsComponent
  ],
  providers: [AboutResolver]
})
export class OtherComponentsModule { }



