import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor( private http: HttpClient) {

   }

  getPageFromWinner(url:string){
    return this.http.get(url);
  }
}
