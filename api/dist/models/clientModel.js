"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var Client = /** @class */ (function () {
    function Client(c) {
        if (c === void 0) { c = {}; }
        console.log('C', c);
        this.username = c.username;
        this.password = c.password;
        this.phonenumber = c.phonenumber;
    }
    Client.prototype.selectGame = function () {
    };
    ; // ເລືອກເກມ
    Client.prototype.playGame = function () {
        return false;
    };
    ; // ຫຼີ້ນເກມ
    Client.prototype.history = function () {
        return [];
    };
    ; // ສະແດງປະຫວັດ
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=clientModel.js.map