import * as express from 'express';
import * as cors from 'cors';
import * as BodyParser from 'body-parser';
import {Routers} from './routers/routers';

import * as mongoose from "mongoose";

import {Schema} from 'mongoose';

export class App{
    app: express.Application ;
    routers: Routers;
    mongoUrl: string = 'mongodb://localhost/LaoappsWinner';
    constructor(){
        this.app = express();        
        this.routers = new Routers();
        this.config();
        this.setUpMongoose();
        
    }
    config(){
        this.app.use(BodyParser.json());
        this.app.use(cors());
        this.app.options('*', cors());
        this.routers.routing(this.app);
        
    }
    setUpMongoose(){
        const option ={
            useNewUrlParser: true, useUnifiedTopology: true,
            useFindAndModify: false, readPreference: "primaryPreferred"
        } as mongoose.ConnectionOptions;
        mongoose.connect(this.mongoUrl,option).then(r=>{
            console.log('mongoose connection ok ')
        }).catch(e=>{
            console.log('error mongoose connection',e)
        })
    }

}
export default new App().app;



