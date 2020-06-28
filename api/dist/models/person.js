"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(name = '', lastName = '', birthDate = '', gender = false) {
        this.birthDate = birthDate;
        this.gender = gender;
        this.lastName = lastName;
        this.name = name;
    }
}
exports.Person = Person;
// export var file_name:string='person.ts';
