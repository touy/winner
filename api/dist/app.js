"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const user_1 = require("./models/user");
class App {
    constructor() {
        //user: IUser = new User('touy','123456',8562055516321,'touya.ra@gmail.com');
        this.user = {};
    }
    createUser(userName, password, phoneNumber, email) {
        this.user = new user_1.User(userName, password, phoneNumber, email);
        return this.user;
    }
    createPersonForUser(user, person) {
        user.setPerson(person);
        this.user = user;
        return this.user;
    }
    show() {
        console.log('show app', this);
    }
}
exports.App = App;
var app = new App();
app.show();
