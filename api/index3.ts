import * as express from 'express';
import {Request,Response,Application} from 'express';
// cors , body-parser
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

let app : Application = express();
app.use(cors());
app.use(bodyParser.json());
// CRUD create , read, update, delet
// read
// 1 PASSED
app.get('/',(req:Request,res:Response)=>{
    res.send({message:'ok'});
})
//2 PASSED
.post('/:id',(req:Request,res:Response)=>{
    let id = req.params.id;
    console.log('id',id);
    res.send({message:id});
})  
// create 3 PASSED
app.put('/',(req:Request,res:Response)=>{
    let user = req.body;
    res.send({message:user});
})
// update 4 PASSED
app.patch('/',(req:Request,res:Response)=>{
    let user = req.body;
    let id = req.query.id;
    res.send({message:user,query:id});
})
// delete 5 PASSED
app.delete('/:id',(req:Request,res:Response)=>{
    let id = req.params.id;
    let code = req.query.code;
    let body = req.body;
    res.send({query:code,param:id,body:body});
})

app.listen(8888,'0.0.0.0',(r)=>{
    console.log('server start 0.0.0.0 port 8888')
});
