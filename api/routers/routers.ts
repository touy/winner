import { Request, Response, NextFunction, Router, Application } from 'express';
import * as mongoose from 'mongoose';

import { } from '../services/services';
import * as jwt from 'jsonwebtoken';
import * as service from '../services/services';

import * as path from 'path';

import { PlayerController } from '../controllers/playerController';
import { IPlayer } from 'models/playerModel';
export class Routers {
    playerController = new PlayerController();
    constructor() {

    }
    public authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, service.default.accessTokenSecret, (err, data: any) => {

                try {
                    if (err) {
                        console.log(err);

                        return res.sendStatus(403).json({ status: err, code: 0 });
                    }
                    console.log('jwt verify ', data);

                    req['usertype'] = data.type;
                    req['user'] = data.user;
                    if (token)
                        req['token'] = token;
                    if (Date.now() >= data.exp * 1000) {
                        res.sendStatus(401).json({ status: 'expired please relogin', code: 0 });
                    }
                    next();
                } catch (error) {
                    console.log(error);
                    res.sendStatus(401).json({ status: error, code: 0 });
                }

            });
        } else {
            res.sendStatus(401);
        }
    };
    formatSuccess(data:any,message:string='ok',statuscode:number=1){
        return {message,data,statuscode};
    }
    formatError(data:any,message:string='error',statuscode:number=0){
        return {message,data,statuscode};
    }
    routing(app: Application) {
        // CRUD  = Create , Read , Update , Delete
        // client
        // get client details 

        app.get('/', (req: Request, res: Response) => {
            res.send({ message: 'Hello', status: 'ok', statusCode: 1 });
        });
        // Players
        //new player
        // object:IPlayer
        app.put('/player', this.addNewPlayer.bind(this))
            // update palyer
            // .post('/player')
            // // delete player
            // .delete('/player/:id')
            // // player info
            .get('/player/:id', this.getPlayerInfo.bind(this))
        // // player list
        .get('/player',this.getPlayerList.bind(this));

    }
    addNewPlayer(req: Request, res: Response) {
        try {
            const p: IPlayer = req.body as IPlayer;
            this.playerController.create(p).then(r => {
                delete r._id;
                delete r.id;
                res.send(this.formatSuccess(r));
            }).catch(e => {
                res.send(this.formatError(e));
            })
        } catch (e) {
            console.log(e);
            res.send(this.formatError(e));
        }

    }
    getPlayerInfo(req: Request, res: Response) {
        try {
            const _id: string = req.params.id;
           this.playerController.playerInfo(_id).then(r=>{
            res.send(this.formatSuccess(r));
           }).catch(e=>{
            res.send(this.formatError(e));
           });
            
        } catch (e) {
            console.log(e);
            res.send(this.formatError(e));
        }



    }
    getPlayerList(req: Request, res: Response) {
        try {
            let limit: number = Number.parseInt((req.query.limit+'')?(req.query.limit+''):'10');
            const offset: number =  Number.parseInt((req.query.offset+'')?(req.query.offset+''):'0');
            limit = limit>100?100:limit;
           this.playerController.playerList(limit,offset).then(r=>{
            res.send(this.formatSuccess(r));
           }).catch(e=>{
            res.send(this.formatError(e));
           });
            
        } catch (e) {
            console.log(e);
            res.send(this.formatError(e));
        }



    }
    // login(req:Request,res:Response){
    //     // let username= req.body.username;
    //     // let password = req.body.password;
    //     let c:Client =new Client(req.body);
    //     let login = this.clientController.login(c);
    //     if(login===true){
    //         res.send({status:'login ok'});
    //     }
    //     else{
    //         res.send({status:'login failed'});
    //     }
    // }
    // getClientDetails(req:Request,res:Response){
    //     let id = req.params.id;
    //     let c = this.clientController.getClientDetails(id);
    //     res.send(c);
    // }
    // setClientDetails(req:Request,res:Response){
    //     this.clientController.setClientDetails({} as Client);
    //     res.end();
    // }
    // selectGame(req:Request,res:Response){
    //     this.clientController.setClientDetails({} as Client);
    //     res.send({message:'select game'});
    // }
    // playGame(req:Request,res:Response){
    //     this.clientController.setClientDetails({} as Client);
    //     res.send({message:'playgame'});
    // }
    // history(req:Request,res:Response){
    //     this.clientController.setClientDetails({} as Client);
    //     res.send({message:'history'});
    // }
    // Query


}
