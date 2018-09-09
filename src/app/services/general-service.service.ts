import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

export interface ProjectList {
  nameOfProject: string;
  info: string;
  url: string;
  kind: string;
  projectImages: Array<string>;
  // node: Array<ProjectList>;
}

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  private itemsCollection: AngularFirestoreCollection<ProjectList>;
  items: Observable<ProjectList[]>;
  projectsList: ProjectList[];
  subscription: Subscription;

  constructor(private httpClient: HttpClient, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<ProjectList>('proyectos');
    this.items = this.itemsCollection.valueChanges();
  }

  init(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.subscription = this.items.subscribe((projectsArray) => {
        this.projectsList = projectsArray;
        setTimeout(() =>{
          resolve();
        }, 5000);

        console.log('entro');
      });
    });
  }





  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }




}


export const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      // console.log(reader.result);
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};
