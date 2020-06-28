import { Request, Response, NextFunction, Router, Application } from 'express';
import * as mongoose from 'mongoose';
import { WalletUserController } from '../controllers/walletUserController';
import { IWalletUser, WalletUserModel, walletUserSchema } from '../models/walletusermodel';
import { } from '../services/services';
import * as jwt from 'jsonwebtoken';
import * as service from '../services/services';
export class Routers {
    walletUserController = new WalletUserController();
    docWalletUser = mongoose.model<IWalletUser, WalletUserModel>('WalletUser', walletUserSchema);
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
        // user
        // read user details
        app.get('/user/:id', this.authenticateJWT, this.getUserDetails.bind(this))
            // delete
            .delete('/user/:id', this.authenticateJWT, this.deleteUser.bind(this))
            // create
            .put('/user', this.authenticateJWT, this.authenticateJWT, this.createUser.bind(this))
            // change password
            .post('/user-change-password', this.authenticateJWT, this.changePassword.bind(this))
            .post('/register', this.registerUser.bind(this))
            .post('/login', this.login.bind(this))
            .post('/reset-password', this.authenticateJWT, this.resetPassword.bind(this));

        app.get('/admin/:id', this.authenticateJWT)
            .get('/users', this.authenticateJWT)
            .delete('/user/:id', this.authenticateJWT)
            .put('/admin', this.authenticateJWT)
            .post('/admins', this.authenticateJWT)
            .post('/admin-change-password', this.authenticateJWT)
    }
    // Query
    // /user?userName=mr.A
    getUserDetails(req: Request, res: Response) {
        try {
            const _user = req['user'] as IWalletUser;
            const usertype = req['usertype'] as service.userType;
            if (!service.default.isUser(usertype)) return res.status(200).send({ status: 'unauthorize', code: 0 });
            let userId = req.params['id'];
            console.log('user id is ', userId);
            if (userId !== _user._id) throw new Error('Unauthorized user!');
            this.walletUserController.getUserDetails(userId).then(r => {
                delete r.password;
                res.send(service.default.okRes(r));
            }).catch(e => {
                res.send(service.default.errRes(e));
            });
        } catch (error) {
            res.send(service.default.errRes(error));
        }
    }
    changePassword(req: Request, res: Response) {
        let id = req.query.id + '';
        const user = req.body as IWalletUser;
        try {
            const _user = req['user'] as IWalletUser;
            const usertype = req['usertype'] as service.userType;
            if (!service.default.isUser(usertype)) return res.status(200).send({ status: 'unauthorize', code: 0 });
            // let userId = req.params['id'];
            console.log('user id is ', id);
            if (id !== _user._id) throw new Error('Unauthorized user!');
            this.walletUserController.changePassword(id, user).then(r => {
                r.password = '';
                res.send(service.default.okRes(r));
            }).catch(e => {
                res.send(service.default.errRes(e));
            });
        } catch (error) {
            res.send(service.default.errRes(error));
        }
    }
    deleteUser(req: Request, res: Response) {
        try {
            const id = req.params['id'];
            const _user = req['user'] as IWalletUser;
            const usertype = req['usertype'] as service.userType;
            if (!service.default.isUser(usertype)) return res.status(200).send({ status: 'unauthorize', code: 0 });
            if (_user._id !== id) return res.status(200).send({ status: 'unauthorize2', code: 0 });
            // let userId = req.params['id'];
            console.log('user id is ', id);

            this.walletUserController.deleteUser(id).then(r => {
                res.send(service.default.okRes(r));
            }).catch(e => {
                res.send(service.default.errRes(e));
            });
        } catch (error) {
            res.send(service.default.errRes(error));
        }

    }
    createUser(req: Request, res: Response) {
        try {
            const user = new this.docWalletUser(req.body);
            const _user = req['user'] as IWalletUser;
            const usertype = req['usertype'] as service.userType;
            if (!service.default.isAdmin(usertype)) return res.status(200).send({ status: 'unauthorize', code: 0 });
            this.walletUserController.createUser(user).then(r => {
                res.send(service.default.okRes(r));
            }).catch(e => {
                res.send(service.default.errRes(e));
            });
        } catch (error) {
            res.send(service.default.errRes(error));
        }
    }
    registerUser(req: Request, res: Response) {
        try {
            const user = new this.docWalletUser(req.body);
            // const _user = req['user'] as IWalletUser;
            const usertype = req['usertype'] as service.userType;
            //  if (!service.default.isSuperAdmin(usertype)) return res.status(200).send({ status: 'unauthorize', code: 0 });
            this.walletUserController.registerUser(user).then(r => {
                res.send(service.default.okRes(r));
            }).catch(e => {
                res.send(service.default.errRes(e));
            });
        } catch (error) {
            res.send(service.default.errRes(error));
        }
    }

    login(req: Request, res: Response) {
        try {
            const user = new this.docWalletUser(req.body);
            // const _user = req['user'] as IWalletUser;
            const usertype = req['usertype'] as service.userType;
            //  if (!service.default.isSuperAdmin(usertype)) return res.status(200).send({ status: 'unauthorize', code: 0 });
            this.walletUserController.login(user).then(r => {
                const token = jwt.sign({ type: service.userType.user, user: r }, service.default.accessTokenSecret, { expiresIn: '15d', issuer: 'laoapps' });
                res.header('authorization', 'BEARER ' + token);
                let d: IWalletUser = JSON.parse(JSON.stringify(r)) as IWalletUser;
                delete d.password;
                delete d.id;
                delete d._id;
                res.send(service.default.okRes(r));
            }).catch(e => {
                res.send(service.default.errRes(e));
            });
        } catch (error) {
            res.send(service.default.errRes(error));
        }
    }
    resetPassword(req: Request, res: Response) {
        try {
            const oldPassword = req.body.oldPassword;
            delete req.body.oldPassword;
            const user = new this.docWalletUser(req.body);
            // const _user = req['user'] as IWalletUser;
            const usertype = req['usertype'] as service.userType;
            if (!service.default.isUser(usertype)) return res.status(200).send({ status: 'unauthorize', code: 0 });
            this.walletUserController.resetPassword(user, oldPassword).then(r => {
                res.send(service.default.okRes(r));
            }).catch(e => {
                res.send(service.default.errRes(e));
            });
        } catch (error) {
            res.send(service.default.errRes(error));
        }
    }


}
