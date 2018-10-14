import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';


import {HomeResolver} from './home/home.resolver';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ThreeComponentComponent } from './three-component/three-component.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {GeneralServiceService} from './services/general-service.service';
import { FullScreenRequestComponent } from './full-screen-request/full-screen-request.component';

const appRoutes: Routes = [
  { path: '', component: FullScreenRequestComponent, pathMatch: 'full'},
  { path: 'welcome', component: HomeComponent, pathMatch: 'full' , resolve: [HomeResolver]},
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
    FullScreenRequestComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (service: GeneralServiceService) => function () {
      return new Promise((resolve) => {

        service.init().then(() => {
          resolve();
        });
      });
    },
    deps: [GeneralServiceService],
    multi: true
  }, HomeResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

