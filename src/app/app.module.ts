import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AngularFittextModule} from 'angular-fittext';

import {GeneralServiceService} from './services/general-service.service';


import {HomeResolver} from './home/home.resolver';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ThreeComponentComponent } from './three-component/three-component.component';
import { GlitchComponent } from './three-component/glitch/glitch.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' , resolve: [HomeResolver]},
  { path: 'REstORinG', loadChildren: './otherComponents/otherComponents.module#OtherComponentsModule'},
  { path: '**' , redirectTo: ''}
];



@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    MenuComponent,
    HomeComponent,
    ThreeComponentComponent,
    GlitchComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    AngularFittextModule,
    HttpClientModule
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
  }, GeneralServiceService, HomeResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
