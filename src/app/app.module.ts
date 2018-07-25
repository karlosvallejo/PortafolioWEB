import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AngularFittextModule} from 'angular-fittext';

import {DelayResolver} from './delay.resolver';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { RootsComponent } from './roots/roots.component';
import { ThreeComponentComponent } from './three-component/three-component.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', loadChildren: './test/test.module#TestModule', pathMatch: 'full', resolve: {dicho : DelayResolver} },
  { path: 'skills', component: SkillsComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full' },
  { path: '**' , redirectTo: ''}
];



@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    MenuComponent,
    HomeComponent,
    SkillsComponent,
    ProjectsComponent,
    RootsComponent,
    ThreeComponentComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    AngularFittextModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => {
      return () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 5000);
        });
      };
    },
    multi: true
  }, DelayResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
