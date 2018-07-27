import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

static started = false;

  constructor(private httpClient: HttpClient) {
      GeneralServiceService.started = true;
  }


  static convertBlobToBase64 (blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        // console.log(reader.result);
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }




  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }




}
