"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletUserController = void 0;
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const walletusermodel_1 = require("../models/walletusermodel");
const walletadminmodel_1 = require("../models/walletadminmodel");
walletusermodel_1.walletUserSchema.method('validPassword', function (password) {
    if (bcryptjs.compareSync(password, this.password))
        return true;
    return false;
});
walletusermodel_1.walletUserSchema.method('hashPassword', (password) => {
    console.log('hash password', password);
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync());
});
walletusermodel_1.walletUserSchema.pre('save', function save(next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        console.log('saving password', this.isModified());
        try {
            console.log('old pass', this.password);
            this.password = this.hashPassword(this.password);
            console.log('updated pass', this.password);
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
class WalletUserController {
    constructor() {
        this.docWalletUser = mongoose.model('WalletUser', walletusermodel_1.walletUserSchema);
        this.docWalletAdmin = mongoose.model('WalletAdmin', walletadminmodel_1.WalletAdminSchema);
    }
    // Query
    // user only
    getUserDetails(userId) {
        console.log('user id is ', userId);
        return new Promise((resolve, reject) => {
            try {
                this.docWalletUser.findById(userId).then(r => {
                    console.log('found username', r);
                    r = this.deleteUserFieldsXId(r);
                    resolve(r);
                }).catch(e => {
                    console.log('finding user details error', e);
                    reject(e);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // user only
    changePassword(id, user) {
        return new Promise((resolve, reject) => {
            try {
                if (id) {
                    user.last_update = Date.now() + '';
                    if (!user.password || user.password.length < 6) {
                        throw new Error('Password must be at least 6 digits');
                    }
                    else {
                        this.docWalletUser.findById(id).then(r => {
                            r.password = user.password;
                            r.save().then(r => {
                                console.log('changed password succeeded', r);
                                r = this.deleteUserFields(r);
                                resolve(r);
                                //return res.status(200).send({ status: 'ok', data: r, code: 1 });
                            }).catch(e => {
                                reject(e);
                            });
                        }).catch(e => {
                            console.log('changed password error', e);
                            reject(e);
                        });
                    }
                }
                else {
                    resolve({});
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            try {
                this.docWalletUser.findByIdAndDelete(id).then(r => {
                    console.log('deleting user details error', r);
                    r = this.deleteUserFields(r);
                    resolve(r);
                }).catch(e => {
                    console.log('deleting user details error', e);
                    reject(e);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    createUser(user) {
        return new Promise((resolve, reject) => {
            try {
                if (!user.userName || !user.password || user.phoneNumber) {
                    reject(new Error('error username/password/phone number is empty'));
                }
                else {
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
                        }
                        else {
                            reject('Error wrong admin code');
                        }
                    }).catch(e => {
                        reject(e);
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    registerUser(user) {
        return new Promise((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject(new Error('error username/password/phone number is empty'));
            }
            else {
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
                    }
                    else {
                        reject('Error wrong admin code');
                    }
                }).catch(e => {
                    reject(e);
                });
            }
        });
    }
    login(user) {
        return new Promise((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject(new Error('error username/password/phone number is empty'));
            }
            else {
                this.docWalletUser.findOne({ userName: user.userName, password: user.password }).then(r => {
                    console.log('create user error', r);
                    if (!r)
                        throw new Error('User not found');
                    if (user.validPassword(user.password)) {
                        r = this.deleteUserFields(r);
                        resolve(r);
                    }
                    else {
                        reject('login failed');
                    }
                }).catch(e => {
                    console.log('create user error', e);
                    reject(e);
                });
            }
        });
    }
    resetPassword(user, oldPassword) {
        return new Promise((resolve, reject) => {
            if (!user.userName || !user.password || user.phoneNumber) {
                reject(new Error('error username/password/phone number is empty'));
            }
            else {
                this.docWalletUser.findOne({ userName: user.userName, password: user.password }).then(r => {
                    console.log('reset password error', r);
                    if (!r)
                        throw new Error('User not found');
                    if (user.validPassword(oldPassword)) {
                        r.password = user.password;
                        r.save().then(_r => {
                            _r = this.deleteUserFields(_r);
                            resolve(_r);
                        }).catch(_e => {
                            reject(_e);
                        });
                    }
                    else {
                        reject('reset password failed');
                    }
                }).catch(e => {
                    console.log('reset password error', e);
                    reject(e);
                });
            }
        });
    }
    deleteUserFields(r) {
        delete r.password;
        delete r.admin;
        delete r.id;
        delete r._id;
        return r;
    }
    deleteUserFieldsXId(r) {
        delete r.id;
        delete r._id;
        return r;
    }
}
exports.WalletUserController = WalletUserController;
//# sourceMappingURL=walletUserController.js.map