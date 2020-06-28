import { Request, Response, NextFunction, Router, Application } from 'express';
import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { IWalletUser, WalletUserDocument, WalletUserModel, walletUserSchema } from '../models/walletusermodel';
import { IWalletAdmin, WalletAdminDocument, WalletAdminModel, WalletAdminSchema } from '../models/walletadminmodel';
import services from '../services/services';
WalletAdminSchema.method('validPassword', function (password: string): boolean {
    if (bcryptjs.compareSync(password, this.password)) return true;
    return false;
});

WalletAdminSchema.method('hashPassword', (password: string): string => {
    console.log('hash password', password);

    return bcryptjs.hashSync(password, bcryptjs.genSaltSync());
});

WalletAdminSchema.pre<IWalletUser>('save', async function save(next) {

    if (!this.isModified('password')) return next();
    console.log('saving password', this.isModified());
    try {
        console.log('old pass', this.password);
        this.password = this.hashPassword(this.password);
        console.log('updated pass', this.password);
        return next();
    } catch (err) {
        return next(err);
    }
});
export class WalletUserController {
    docWalletUser = mongoose.model<IWalletUser, WalletUserModel>('WalletUsers', walletUserSchema);
    docWalletAdmin = mongoose.model<IWalletAdmin, WalletAdminModel>('WalletAdmins', WalletAdminSchema);
    constructor() {

    }
    // Query
    // admin only for user
    getUserDetails(userId: string): Promise<IWalletUser> {
        console.log('user id is ', userId);
        return new Promise<IWalletUser>((resolve, reject) => {
            try {
                this.docWalletUser.findById(userId).then(r => {
                    console.log('found username', r);
                    resolve(r);
                }).catch(e => {
                    console.log('finding user details error', e);
                    reject(e);
                });
            } catch (error) {
                reject(error);
            }

        });
    }
    // admin only
    changeAdminPassword(id: string, user: IWalletAdmin): Promise<IWalletAdmin> {
        return new Promise<IWalletAdmin>((resolve, reject) => {
            try {
                if (id) {
                    user.last_update = Date.now() + '';
                    if (!user.password || user.password.length < 6) {
                        throw new Error('Password must be at least 6 digits');
                    } else {
                        this.docWalletAdmin.findById(id).then(r => {
                            r.password = user.password;
                            r.save().then(r => {
                                console.log('changed password succeeded', r);
                                resolve(r)
                                //return res.status(200).send({ status: 'ok', data: r, code: 1 });
                            }).catch(e => {
                                reject(e)
                            });

                        }).catch(e => {
                            console.log('changed password error', e);
                            reject(e);
                        });
                    }

                } else {
                    resolve({} as IWalletAdmin);
                }
            } catch (error) {
                reject(error);
            }

        });
    }
    // admin only for user
    deleteUser(id: string): Promise<IWalletUser> {
        return new Promise<IWalletUser>((resolve, reject) => {
            try {
                this.docWalletUser.findByIdAndDelete(id).then(r => {
                    console.log('deleting user details error', r);
                    resolve(r);
                }).catch(e => {
                    console.log('deleting user details error', e);
                    reject(e);
                })
            } catch (error) {
                reject(error);
            }

        });

    }
    // super admin for admin
    deleteAdmin(id: string): Promise<IWalletAdmin> {
        return new Promise<IWalletAdmin>((resolve, reject) => {
            try {
                this.docWalletAdmin.findByIdAndDelete(id).then(r => {
                    console.log('deleting user details error', r);
                    resolve(r);
                }).catch(e => {
                    console.log('deleting user details error', e);
                    reject(e);
                });
            } catch (error) {
                reject(error);
            }

        });

    }
    // superadmin only for admin
    createAmin(userAdmin: IWalletAdmin, admin: IWalletAdmin): Promise<IWalletAdmin> {
        return new Promise<IWalletAdmin>((resolve, reject) => {
            try {
                if (!userAdmin.userName || !userAdmin.password || userAdmin.phoneNumber) {
                    reject(new Error('error username/password/phone number is empty'));
                } else {
                    userAdmin.adminCode = services.generatePassword(12);  // random code                  
                    userAdmin.save().then(r => {
                        console.log('create user error', r);
                        resolve(r);
                    }).catch(e => {
                        console.log('create user error', e);
                        reject(e);
                    });
                }
            } catch (error) {
                reject(error);
            }

        });
    }

    // admin only
    login(user: IWalletAdmin): Promise<IWalletAdmin> {
        return new Promise<IWalletAdmin>((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject('error username/password/phone number is empty');
            } else {
                this.docWalletAdmin.findOne({ userName: user.userName, password: user.password }).then(r => {
                    console.log('create user error', r);
                    if (!r) throw new Error('User not found');
                    if (user.validPassword(user.password)) {
                        resolve(r);
                    } else {
                        reject('login failed');
                    }
                }).catch(e => {
                    console.log('create user error', e);
                    reject(e);
                });
            }
        });
    }
    // admin only
    loginSuper(user: IWalletAdmin): Promise<IWalletAdmin> {
        return new Promise<IWalletAdmin>((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject('error username/password/phone number is empty');
            } else {
                this.docWalletAdmin.findOne({ userName: user.userName, password: user.password }).then(r => {
                    console.log('create user error', r);
                    if (!r) throw new Error('User not found');
                    if (user.validPassword(user.password)) {
                        resolve(r);
                    } else {
                        reject('login failed');
                    }
                }).catch(e => {
                    console.log('create user error', e);
                    reject(e);
                });
            }
        });
    }
    // admin only
    resetPassword(user: IWalletAdmin, oldPassword: string): Promise<IWalletAdmin> {
        return new Promise<IWalletAdmin>((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject('error username/password/phone number is empty');
            } else {
                this.docWalletAdmin.findOne({ userName: user.userName, password: user.password }).then(r => {
                    console.log('reset password error', r);
                    if (!r) throw new Error('User not found');
                    if (user.validPassword(oldPassword)) {
                        r.password = user.password;
                        r.save().then(r2 => {
                            delete r.password;
                            delete r.id;
                            delete r._id;
                            resolve(r2);
                        }).catch(e => {
                            reject(e);
                        });

                    } else {
                        reject('reset password failed');
                    }
                }).catch(e => {
                    console.log('reset password error', e);
                    reject(e);
                });
            }
        });
    }
    deleteUserFields(r: IWalletUser): IWalletUser {
        delete r.password;
        delete r.admin;
        delete r.id;
        delete r._id;
        return r;
    }
    deleteUserFieldsXId(r: IWalletUser): IWalletUser {
        delete r.id;
        delete r._id;
        return r;
    }
    deleteAdminFields(r: IWalletAdmin): IWalletAdmin {
        delete r.password;
        delete r.adminCode;
        delete r.id;
        delete r._id;
        return r;
    }
    deleteAdminFieldsXId(r: IWalletAdmin): IWalletAdmin {
        delete r.id;
        delete r._id;
        return r;
    }
}