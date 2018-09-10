import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import {delay, first} from 'rxjs/operators';
import {convertBlobToBase64, GeneralServiceService, ProjectList} from '../../services/general-service.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';




@Injectable()
export class ProjectsResolver implements Resolve<ProjectList[]> {



  constructor(private service: GeneralServiceService) { }


  resolve(): Promise<ProjectList[]> {

return new Promise<ProjectList[]>((resolve1) => {
  const urlsCotainer: string[][] = [];

  const objectToModify = this.service.projectsList;

  objectToModify.forEach( (document) => {
    urlsCotainer.push(document.projectImages);
  });

  const promisesArray: Promise<Blob>[][] = urlsCotainer.map( (undoc) => {
    return undoc.map( (url) => {
      return this.service.getImage(url).toPromise();
    });
  });



  Promise.all(
    promisesArray.map((innerPromiseArray) => {
      return Promise.all(innerPromiseArray);
    })
  ).then( (promiseGroupResult) => {
    const blobPromisesArray: Promise<string>[][] = promiseGroupResult.map( (undoc) => {
      return undoc.map( (url) => {
        return convertBlobToBase64(url);
      });
    });

    Promise.all(
      blobPromisesArray.map((innerPromiseArrayTwo) => {
        return Promise.all(innerPromiseArrayTwo);
      })
    ).then( (promiseGroupResultTwo) => {
      objectToModify.map((document, index) => {
        const documi = document;
        documi.projectImages = promiseGroupResultTwo[index];
        return documi;
      });
      setTimeout(() => {
        resolve1(objectToModify);
      }, 3000);
    });

  });
});




    /*
    return new Promise<void>((resolve) => {

      setTimeout(() => {
        resolve();
      }, 500);
    });
    //  return of([]).pipe(delay(5000));
    */
  }
}
