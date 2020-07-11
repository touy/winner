"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
var jwt = require("jsonwebtoken");
var service = require("../services/services");
var clientController_1 = require("../controllers/clientController");
var clientModel_1 = require("../models/clientModel");
var Routers = /** @class */ (function () {
    function Routers() {
        // walletUserController = new WalletUserController();
        // docWalletUser = mongoose.model<IWalletUser, WalletUserModel>('WalletUser', walletUserSchema);
        this.clientController = new clientController_1.ClientController();
        this.authenticateJWT = function (req, res, next) {
            var authHeader = req.headers.authorization;
            if (authHeader) {
                var token_1 = authHeader.split(' ')[1];
                jwt.verify(token_1, service.default.accessTokenSecret, function (err, data) {
                    try {
                        if (err) {
                            console.log(err);
                            return res.sendStatus(403).json({ status: err, code: 0 });
                        }
                        console.log('jwt verify ', data);
                        req['usertype'] = data.type;
                        req['user'] = data.user;
                        if (token_1)
                            req['token'] = token_1;
                        if (Date.now() >= data.exp * 1000) {
                            res.sendStatus(401).json({ status: 'expired please relogin', code: 0 });
                        }
                        next();
                    }
                    catch (error) {
                        console.log(error);
                        res.sendStatus(401).json({ status: error, code: 0 });
                    }
                });
            }
            else {
                res.sendStatus(401);
            }
        };
    }
    Routers.prototype.routing = function (app) {
        // CRUD  = Create , Read , Update , Delete
        // client
        // get client details 
        app.post('/setClientDetails', this.setClientDetails.bind(this));
        app.post('/getClientDetails/:id', this.getClientDetails.bind(this));
        app.post('/login', this.login.bind(this));
        app.get('/selectGame', this.selectGame.bind(this));
        app.get('/playGame', this.playGame.bind(this));
        app.get('/history', this.history.bind(this));
    };
    Routers.prototype.login = function (req, res) {
        // let username= req.body.username;
        // let password = req.body.password;
        var c = new clientModel_1.Client(req.body);
        var login = this.clientController.login(c);
        if (login === true) {
            res.send({ status: 'login ok' });
        }
        else {
            res.send({ status: 'login failed' });
        }
    };
    Routers.prototype.getClientDetails = function (req, res) {
        var id = req.params.id;
        var c = this.clientController.getClientDetails(id);
        res.send(c);
    };
    Routers.prototype.setClientDetails = function (req, res) {
        this.clientController.setClientDetails({});
        res.end();
    };
    Routers.prototype.selectGame = function (req, res) {
        this.clientController.setClientDetails({});
        res.send({ message: 'select game' });
    };
    Routers.prototype.playGame = function (req, res) {
        this.clientController.setClientDetails({});
        res.send({ message: 'playgame' });
    };
    Routers.prototype.history = function (req, res) {
        this.clientController.setClientDetails({});
        res.send({ message: 'history' });
    };
    return Routers;
}());
exports.Routers = Routers;
//# sourceMappingURL=routers.js.map