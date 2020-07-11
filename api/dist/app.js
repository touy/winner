"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require("express");
var cors = require("cors");
var BodyParser = require("body-parser");
var routers_1 = require("./routers/routers");
var mongoose = require("mongoose");
var App = /** @class */ (function () {
    function App() {
        this.mongoUrl = 'mongodb://localhost/LaoappsWallet';
        this.app = express();
        this.routers = new routers_1.Routers();
        this.config();
        this.setUpMongoose();
    }
    App.prototype.config = function () {
        this.app.use(BodyParser.json());
        this.app.use(cors());
        this.app.options('*', cors());
        this.routers.routing(this.app);
    };
    App.prototype.setUpMongoose = function () {
        var option = {
            useNewUrlParser: true, useUnifiedTopology: true,
            useFindAndModify: false, readPreference: "primaryPreferred"
        };
        mongoose.connect(this.mongoUrl, option).then(function (r) {
            console.log('mongoose connection ok ');
        }).catch(function (e) {
            console.log('error mongoose connection', e);
        });
    };
    return App;
}());
exports.App = App;
exports.default = new App().app;
//# sourceMappingURL=app.js.map