import { Component, OnInit } from '@angular/core';
import {ApiserviceService,IPlayer,IResForm} from '../apiservice.service';
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  player:IPlayer = {} as IPlayer;
  playerList :IPlayer[] =[];
  constructor(
    private apiservice:ApiserviceService
  ) {

   }

  ngOnInit(): void {
    this.getPlayerList();
  }

  addNewPlayer(){
    let x = this.apiservice.addNewPlayer(this.player);
    x?x.subscribe(r=>{
      let res = r as IResForm;
      if(res.statuscode===1){
        this.player = res.data as IPlayer;
      }else{
        alert(JSON.stringify(res));
      }
    },e=>{
      alert(JSON.stringify(e));
    }):'';
  }
 
  getPlayerInfo(_id:string){
    let x = this.apiservice.getPlayerInfo(_id);
    x?x.subscribe(r=>{
      let res = r as IResForm;
      if(res.statuscode===1){
        this.player = res.data as IPlayer;
      }else{
        alert(JSON.stringify(res));
      }
    },e=>{
      alert(JSON.stringify(e));
    }):'';
  }

  getPlayerList(){
    let x = this.apiservice.getPlayerList(10,0);
    x?x.subscribe(r=>{
      let res = r as IResForm;
      if(res.statuscode===1){
        this.playerList = res.data as IPlayer[];
      }else{
        alert(JSON.stringify(res));
      }
    },e=>{
      alert(JSON.stringify(e));
    }):'';
  }
  getNewPlayerInfo(){
    return JSON.stringify(this.player);
  }

}
