"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const person_1 = require("./person");
class User {
    constructor(userName, password, phoneNumber, email) {
        this.person = new person_1.Person();
        this.userName = userName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    setPerson(person) {
        this.person = person;
    }
    getPerson() {
        return this.person;
    }
}
exports.User = User;
