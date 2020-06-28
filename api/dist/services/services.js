"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = void 0;
class Services {
    constructor() {
        this.accessTokenSecret = 'fdsasdfkasfnsalvsad2134t3fhzchfq4foufpqw';
    }
    okRes(data, message = '') {
        message = message ? message : 'ok';
        return { message, data, code: 1 };
    }
    errRes(data = {}, message = '', code = 0) {
        message = message ? message : 'error';
        code = code ? code : 0;
        return { message, data, code };
    }
    generatePassword(length = 6) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    isUser(e) {
        if (e == userType.user)
            return true;
        return false;
    }
    isSuperAdmin(e) {
        if (e == userType.superadmin)
            return true;
        return false;
    }
    isAdmin(e) {
        if (e == userType.admin)
            return true;
        return false;
    }
    isAuthorized(e) {
        if (e == userType.superadmin || e == userType.user)
            return true;
        return false;
    }
}
var userType;
(function (userType) {
    userType["user"] = "user";
    userType["superadmin"] = "superadmin";
    userType["admin"] = "admin";
})(userType = exports.userType || (exports.userType = {}));
exports.default = new Services();
//# sourceMappingURL=services.js.map