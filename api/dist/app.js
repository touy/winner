"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const routers_1 = require("./routers/routers");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.mongoUrl = 'mongodb://localhost/LaoappsWallet';
        this.app = express();
        this.routers = new routers_1.Routers();
        this.config();
        this.setUpMongoose();
    }
    config() {
        this.app.use(BodyParser.json());
        this.app.use(cors());
        this.app.options('*', cors());
        this.routers.routing(this.app);
    }
    setUpMongoose() {
        const option = {
            useNewUrlParser: true, useUnifiedTopology: true,
            useFindAndModify: false, readPreference: "primaryPreferred"
        };
        mongoose.connect(this.mongoUrl, option).then(r => {
            console.log('mongoose connection ok ');
        }).catch(e => {
            console.log('error mongoose connection', e);
        });
    }
}
exports.App = App;
exports.default = new App().app;
//# sourceMappingURL=app.js.map