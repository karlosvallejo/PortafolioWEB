import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';

export interface ProjectList {
  nameOfProject: string;
  info: string;
  url: string|null;
  github: string|null;
  behance: string|null;
  kind: string;
  projectImages: Array<string>;
  // node: Array<ProjectList>;
}

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  private itemsCollection: AngularFirestoreCollection<ProjectList>;
  private items: Observable<ProjectList[]>;
  projectsList: ProjectList[];
  private subscription: Subscription;

  constructor(private httpClient: HttpClient, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<ProjectList>('proyectos');
    this.items = this.itemsCollection.valueChanges();
  }

  init(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.subscription = this.items.subscribe((projectsArray) => {
        this.projectsList = projectsArray;
        setTimeout(() => {
          resolve();
        }, 1000);

        console.log('entro');
      });
    });
  }





  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }




}


export const convertBlobToBase64 = function (blob: Blob): Promise<string> {
  return new Promise<string>(function (resolve, reject) {
    const reader: FileReader = new FileReader;
    reader.readAsDataURL(blob);
    reader.onerror = reject;
    reader.onloadend = function() {
       // console.log(reader.result);
       resolve(reader.result.toString());
    };
  });
};
