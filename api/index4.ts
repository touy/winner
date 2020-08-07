import * as express from 'express';
import { Request, Response, Application } from 'express';
// cors , body-parser
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { DataTypes, Sequelize } from 'sequelize';
import { INTEGER } from 'sequelize';

let app: Application = express();
app.use(cors());
app.use(bodyParser.json());

class myUser {
    id?:string;
    username: string;
    password: string;
    phonenumber: number;
}


const dbconnection = new Sequelize('test2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

let userEntity = dbconnection.define('myUser', {
    id: {type:INTEGER,primaryKey:true,unique:true,autoIncrement:true,autoIncrementIdentity:true},
    username: { type: DataTypes.STRING,unique:true },
    password: { type: DataTypes.STRING },
    phonenumber: { type: DataTypes.INTEGER }
})


dbconnection.authenticate().then(r => {
    console.log('connection to mysql ', r);
    userEntity.sync();
    // CRUD create , read, update, delet
    // read all
    // 1  PPPPPP
    app.get('/', (req: Request, res: Response) => {

        userEntity.findAll().then(r => {
            res.send({ status: 1, data: r });
        }).catch(e => {
            res.send({ status: 0, data: e });
        });
        
    })
        //2 PASSED by id PPPPPP
        .post('/:id', (req: Request, res: Response) => {
            let id = req.params.id;
            userEntity.findByPk(id).then(r => {
                res.send({ status: 1, data: r });
            }).catch(e => {
                res.send({ status: 0, data: e });
            });
            
        })
    // create 3  PPPPPP
    app.put('/', (req: Request, res: Response) => {
        let user = userEntity.build(req.body);
        //delete user.id;
        user.save().then(r => {
            res.send({ status: 1, data: r });
        }).catch(e => {
            res.send({ status: 0, data: e });
        });

        // userEntity.create(user).then(r => {
        //     res.send({ status: 0, data: r });
        // }).catch(e => {
        //     res.send({ status: 0, data: e });
        // });
    })
    // update 4 PPPPPPPPP
    app.patch('/', (req: Request, res: Response) => {
        let id = req.query.id+'';
        let u = userEntity.build(req.body) as unknown as myUser;
        userEntity.findByPk(id).then( async r => {
            r['phonenumber'] = u.phonenumber;
            let x = await r.save();
            res.send({ status: 1, data: x });
        }).catch(e => {
            res.send({ status: 0, data: e });
        });
    })
    // delete 5 PPPPPPP
    app.delete('/', (req: Request, res: Response) => {
        let id = req.query.id+'';        
        userEntity.findByPk(id).then( async r => {
            let x = r.destroy();
            res.send({ status: 1, data: x });
        }).catch(e => {
            res.send({ status: 0, data: e });
        });
    })

    app.listen(8888, '0.0.0.0', (r) => {
        console.log('server start 0.0.0.0 port 8888')
    });
}).catch(e => {

})

