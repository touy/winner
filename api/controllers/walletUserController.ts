import { Request, Response, NextFunction, Router, Application } from 'express';
import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { IWalletUser, WalletUserDocument, WalletUserModel, walletUserSchema } from '../models/walletusermodel';
import { IWalletAdmin, WalletAdminDocument, WalletAdminModel, WalletAdminSchema } from '../models/walletadminmodel';
walletUserSchema.method('validPassword', function (password: string): boolean {
    if (bcryptjs.compareSync(password, this.password)) return true;
    return false;
});

walletUserSchema.method('hashPassword', (password: string): string => {
    console.log('hash password', password);
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync());
});

walletUserSchema.pre<IWalletUser>('save', async function save(next) {

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
    docWalletUser = mongoose.model<IWalletUser, WalletUserModel>('WalletUser', walletUserSchema);
    docWalletAdmin = mongoose.model<IWalletAdmin, WalletAdminModel>('WalletAdmin', WalletAdminSchema);
    constructor() {


    }
    // Query
    // user only
    getUserDetails(userId: string): Promise<IWalletUser> {
        console.log('user id is ', userId);
        return new Promise<IWalletUser>((resolve, reject) => {
            try {
                this.docWalletUser.findById(userId).then(r => {
                    console.log('found username', r);
                    r = this.deleteUserFieldsXId(r);
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
    // user only
    changePassword(id: string, user: IWalletUser): Promise<IWalletUser> {
        return new Promise<IWalletUser>((resolve, reject) => {
            try {
                if (id) {
                    user.last_update = Date.now() + '';
                    if (!user.password || user.password.length < 6) {
                        throw new Error('Password must be at least 6 digits');
                    } else {
                        this.docWalletUser.findById(id).then(r => {
                            r.password = user.password;
                            r.save().then(r => {
                                console.log('changed password succeeded', r);
                                r = this.deleteUserFields(r);
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
                    resolve({} as IWalletUser);
                }
            } catch (error) {
                reject(error);
            }

        });
    }
    deleteUser(id: string): Promise<IWalletUser> {
        return new Promise((resolve, reject) => {
            try {
                this.docWalletUser.findByIdAndDelete(id).then(r => {
                    console.log('deleting user details error', r);
                    r = this.deleteUserFields(r);
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
    createUser(user: IWalletUser): Promise<IWalletUser> {
        return new Promise<IWalletUser>((resolve, reject) => {
            try {
                if (!user.userName || !user.password || user.phoneNumber) {
                    reject(new Error('error username/password/phone number is empty'));
                } else {
                    this.docWalletAdmin.findOne({ adminCode: user.admin }).then(r => {
                        if (r) {
                            user.admin = r._id;
                            user.save().then(_r => {
                                console.log('create user error', _r);
                                _r = this.deleteUserFields(_r);
                                resolve(_r);
                            }).catch(_e => {
                                console.log('create user error', _e);
                                reject(_e);
                            });
                        } else {
                            reject('Error wrong admin code');
                        }
                    }).catch(e => {
                        reject(e);
                    });
                }
            } catch (error) {
                reject(error);
            }

        });
    }
    registerUser(user: IWalletUser): Promise<IWalletUser> {
        return new Promise<IWalletUser>((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject(new Error('error username/password/phone number is empty'))
            } else {
                this.docWalletAdmin.findOne({ adminCode: user.admin }).then(r => {
                    if (r) {
                        user.admin = r._id;
                        user.save().then(_r => {
                            console.log('register user successfully', _r);
                            _r = this.deleteUserFields(_r);
                            resolve(_r);
                        }).catch(_e => {
                            console.log('register user error', _e);
                            reject(_e);
                        });
                    } else {
                        reject('Error wrong admin code');
                    }
                }).catch(e => {
                    reject(e);
                });

            }
        });
    }
    login(user: IWalletUser): Promise<IWalletUser> {
        return new Promise<IWalletUser>((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject(new Error('error username/password/phone number is empty'));
            } else {
                this.docWalletUser.findOne({ userName: user.userName, password: user.password }).then(r => {
                    console.log('create user error', r);
                    if (!r) throw new Error('User not found');
                    if (user.validPassword(user.password)) {
                        r = this.deleteUserFields(r);
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
    resetPassword(user: IWalletUser, oldPassword: string): Promise<IWalletUser> {
        return new Promise<IWalletUser>((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject(new Error('error username/password/phone number is empty'));
            } else {
                this.docWalletUser.findOne({ userName: user.userName, password: user.password }).then(r => {
                    console.log('reset password error', r);
                    if (!r) throw new Error('User not found');
                    if (user.validPassword(oldPassword)) {
                        r.password = user.password;
                        r.save().then(_r => {
                            _r = this.deleteUserFields(_r);
                            resolve(_r);
                        }).catch(_e => {
                            reject(_e);
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
}