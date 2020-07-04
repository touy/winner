import {Client,IClient} from '../models/clientModel';
import { Request, Response } from 'express';
export class ClientController {
    client:Client;
    constructor(){
        this.client = new Client();
    }
    login(c:Client):boolean{
        
        this.client.username ='user1';
        this.client.password ='12345';
        console.log('C controller',c);
        console.log('client controller',this.client);
        
        
        if(c.username===this.client.username && c.password===this.client.password){
            return true;
        }
        return false;
    }
    logout(user:string):boolean{

        return false;
    }
    setClientDetails(c:Client):void{
        

    }
    getClientDetails(id:string):Client{

        return {} as Client;
    }
    playGame():boolean{
        return this.playGame();
    }
    selectGame():void{
        this.client.selectGame();
    }
    history():any[]{
        return this.client.history();
    }

}