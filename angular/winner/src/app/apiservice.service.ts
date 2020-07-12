import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  url='http://localhost:3333/';
  constructor(private http:HttpClient) { }
  addNewPlayer(p:IPlayer){
    let path = 'player/';
    console.log('p',p);
    
    if(!p.username||!p.password||!p.phonenumber||p.username.length<6||p.password.length<6||(p.phonenumber+'').length!=10){
      alert('Invalid new player info');
      return null;
    }
    return this.http.put(this.url+path,p);
  }
  getPlayerInfo(_id:string){
    let path = 'player/';

    return this.http.get(this.url+path+_id);
  }
  getPlayerList(limit:number = 10,offset:number = 0){
    let path = 'player/';
    let query = `?limit=${limit}&offset=${offset}`;
    return this.http.get(this.url+path+query);
  }
}
export interface IResForm{
  message:string;
  data:any;
  statuscode:number;
}
export interface IPlayer {
  _id:string;
  username: string;
  password: string;
  phonenumber: string;
}
