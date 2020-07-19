import { DataTypes, Sequelize } from 'sequelize';
import {Request,Response,Application} from 'express';
import * as express from 'express';
import * as cors from 'cors'; // RESTFULL API
import * as bodyParser from 'body-parser'; // receive JSON

import { UserModel } from './user.model';
import {GameModel } from './game.model';
// ສ້າງ CONNECTION
const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
// ສ້າງ ENTITY
let userEntity = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING,unique:true },
    password: { type: DataTypes.STRING},
    phonenumber: { type: DataTypes.STRING }
});

let gameEntity = sequelize.define('Games', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userid: { type: DataTypes.INTEGER },
    result: { type: DataTypes.INTEGER},
    createdAt: { type: DataTypes.DATE }
});
// gameEntity.sync();
// ບັງຄັບ ສ້າງ TABLE , ແລະ ປ່ຽນໂຄງສ້າງ
//1
sequelize.authenticate().then(r => {
    // 

    // ສ້າງ USER ໃໝ່
    // 2...
    // let newUser = new UserModel();

    // newUser.username = 'touy';
    // newUser.password = '123456';
    // newUser.phonenumber = '8562055516321';
    // newUser.updateAt = new Date().toDateString();
    // newUser.createdAt = new Date().toDateString();

    // // ປ້ອນ MODEL ລົງ ຖານ ຂໍ້ມູນ ຜ່ານ ENTITY
    // user.create(newUser).then(function (r) {
    //     console.log('r=', r);
    // }).catch(e => {
    //     console.log('e=', e);
    // });
    let app : Application = express();
    app.use(cors());
    app.use(bodyParser.json());

    // path URI
    // CRUD , create , read (list) , update , delete
    app
    // TESTED PASSED
    .get('/',(req:Request,res:Response)=>{
        console.log('query',req.query);
        console.log('params',req.params);
        console.log('body',req.body);
        
        res.send({message:'no params',params:req.params,query:req.query,body:req.body});
    })
    // list
    // TESTED PASSED
    .get('/users',(req:Request,res:Response)=>{
        console.log('query',req.query);
        console.log('params',req.params);
        console.log('body',req.body);
        //1.
        userEntity.findAll().then(r=>{
            // 2. 
            let u = r as unknown as UserModel[];
            res.send(u);
        });
        //2.
        
    })
    // show info
    // TESTED PASSED
    .post('/user/:id',(req:Request,res:Response)=>{
        let id = req.params.id
        userEntity.findByPk(id).then(r=>{
            res.send(r);
        }).catch(e=>{
            res.send(e);
        });
    })
    // search
    // TESTED PASSED
    .post('/user/search/:username',(req:Request,res:Response)=>{
        let username = req.params.username
        userEntity.findOne({where:{username:username}}).then(r=>{
            res.send(r);
        }).catch(e=>{
            res.send(e);
        });
    })
    // create
    // TESTED PASSED
    .put('/user',(req:Request,res:Response)=>{
        console.log('query',req.query);
        console.log('params',req.params);
        console.log('body',req.body);
        let user = req.body as UserModel;
        userEntity.create(user).then(r=>{
            res.send(r);
        }).catch(e=>{
            res.send(e);
        });
    })
    // update
    // TESTED PASSED
    .patch('/user',(req:Request,res:Response)=>{

        console.log('query',req.query);
        console.log('params',req.params);
        console.log('body',req.body);
        let user = req.body as UserModel;
        userEntity.findOne({where:{id:user.id}}).then(async r=>{
            let _user = r as unknown as UserModel;
            
            _user.password = user.password;
            _user.phonenumber = user.phonenumber;
            _user.updateAt = new Date().toDateString();

            let updatedUser = await r.save();
            res.send(updatedUser);
        }).catch(e=>{
            res.send(e);
        });
    })
    // delete
    // TESTED PASSED
    .delete('/user/:id',(req:Request,res:Response)=>{
        console.log('query',req.query);
        console.log('params',req.params);
        console.log('body',req.body);
        let id = req.params.id;
        userEntity.findByPk(id).then(async r=>{
            await r.destroy();
            res.send(r);
        }).catch(e=>{
            res.send(e);
        });
    })
    .get('/game-result/:id',(req:Request,res:Response)=>{
        let result = Math.floor(Math.random() * 10) + 3;
        let id = req.params.id;
        userEntity.findByPk(id).then(x=>{
            let u = x as unknown as UserModel;
            if(u){
                gameEntity.create({userid:u.id,result,createdDate:Date().toString()}).then(r=>{
                    res.send({status:1,result});
                }).catch(e=>{
                    res.send({status:0,e});
                });
            }else{
                res.send({status:0,e:'user not found'});
            }
        }).catch(e=>{res.send({status:0,e})});
        
    })
    app.listen(3434,'0.0.0.0',(s)=>{
        console.log('server start 0.0.0.0 port 3434',s);
    })

}).catch(e => {
    console.log('e2',e);
    
});
