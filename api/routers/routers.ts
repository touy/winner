import { Request, Response, NextFunction, Router, Application } from 'express';
import * as mongoose from 'mongoose';

import { } from '../services/services';
import * as jwt from 'jsonwebtoken';
import * as service from '../services/services';
import {ClientController} from '../controllers/clientController';
import { Client } from '../models/clientModel';
import * as path from 'path';

export class Routers {
    // walletUserController = new WalletUserController();
    // docWalletUser = mongoose.model<IWalletUser, WalletUserModel>('WalletUser', walletUserSchema);
    clientController = new ClientController();
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
    routing(app: Application) {
        // CRUD  = Create , Read , Update , Delete
        // client
        // get client details 
        app.
        app.get('/',(req:Request,res:Response)=>{
            res.send({message:'Hello',status:'ok',statusCode:1});
        });
        app.get('/ok',(req:Request,res:Response)=>{
            res.send({message:'ok',status:'ok',statusCode:1});
        });
        app.get('/page',(req:Request,res:Response)=>{
            let html ='<h1>page</h1>';
            res.send(html);
        });
        app.get('/html',(req:Request,res:Response)=>{
            let html ='<h1>page</h1>';
            res.sendFile(path.join(__dirname+'/about.html'));
        });

        app.post('/setClientDetails',this.setClientDetails.bind(this));
        app.post('/getClientDetails/:id',this.getClientDetails.bind(this));
        app.post('/login',this.login.bind(this));

        app.get('/selectGame',this.selectGame.bind(this));
        app.get('/playGame',this.playGame.bind(this));
        app.get('/history',this.history.bind(this));
 
    }
    login(req:Request,res:Response){
        // let username= req.body.username;
        // let password = req.body.password;
        let c:Client =new Client(req.body);
        let login = this.clientController.login(c);
        if(login===true){
            res.send({status:'login ok'});
        }
        else{
            res.send({status:'login failed'});
        }
    }
    getClientDetails(req:Request,res:Response){
        let id = req.params.id;
        let c = this.clientController.getClientDetails(id);
        res.send(c);
    }
    setClientDetails(req:Request,res:Response){
        this.clientController.setClientDetails({} as Client);
        res.end();
    }
    selectGame(req:Request,res:Response){
        this.clientController.setClientDetails({} as Client);
        res.send({message:'select game'});
    }
    playGame(req:Request,res:Response){
        this.clientController.setClientDetails({} as Client);
        res.send({message:'playgame'});
    }
    history(req:Request,res:Response){
        this.clientController.setClientDetails({} as Client);
        res.send({message:'history'});
    }
    // Query


}
