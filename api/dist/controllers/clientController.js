"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
var clientModel_1 = require("../models/clientModel");
var ClientController = /** @class */ (function () {
    function ClientController() {
        this.client = new clientModel_1.Client();
    }
    ClientController.prototype.login = function (c) {
        this.client.username = 'user1';
        this.client.password = '12345';
        console.log('C controller', c);
        console.log('client controller', this.client);
        if (c.username === this.client.username && c.password === this.client.password) {
            return true;
        }
        return false;
    };
    ClientController.prototype.logout = function (user) {
        return false;
    };
    ClientController.prototype.setClientDetails = function (c) {
    };
    ClientController.prototype.getClientDetails = function (id) {
        return {};
    };
    ClientController.prototype.playGame = function () {
        return this.playGame();
    };
    ClientController.prototype.selectGame = function () {
        this.client.selectGame();
    };
    ClientController.prototype.history = function () {
        return this.client.history();
    };
    return ClientController;
}());
exports.ClientController = ClientController;
//# sourceMappingURL=clientController.js.map