"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = void 0;
var Services = /** @class */ (function () {
    function Services() {
        this.accessTokenSecret = 'fdsasdfkasfnsalvsad2134t3fhzchfq4foufpqw';
    }
    Services.prototype.okRes = function (data, message) {
        if (message === void 0) { message = ''; }
        message = message ? message : 'ok';
        return { message: message, data: data, code: 1 };
    };
    Services.prototype.errRes = function (data, message, code) {
        if (data === void 0) { data = {}; }
        if (message === void 0) { message = ''; }
        if (code === void 0) { code = 0; }
        message = message ? message : 'error';
        code = code ? code : 0;
        return { message: message, data: data, code: code };
    };
    Services.prototype.generatePassword = function (length) {
        if (length === void 0) { length = 6; }
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };
    Services.prototype.isUser = function (e) {
        if (e == userType.user)
            return true;
        return false;
    };
    Services.prototype.isSuperAdmin = function (e) {
        if (e == userType.superadmin)
            return true;
        return false;
    };
    Services.prototype.isAdmin = function (e) {
        if (e == userType.admin)
            return true;
        return false;
    };
    Services.prototype.isAuthorized = function (e) {
        if (e == userType.superadmin || e == userType.user)
            return true;
        return false;
    };
    return Services;
}());
var userType;
(function (userType) {
    userType["user"] = "user";
    userType["superadmin"] = "superadmin";
    userType["admin"] = "admin";
})(userType = exports.userType || (exports.userType = {}));
exports.default = new Services();
//# sourceMappingURL=services.js.map