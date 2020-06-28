"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cWallet = exports.currencies = void 0;
// TEXT
var mystring = 'abc';
mystring = 'abc,123,4576      ';
// console.log('char at ',mystring[0]);
// console.log('char at ',mystring.charCodeAt(0));
// console.log('char at ',mystring.replace('abc','ABC'));
// console.log('char at ',mystring.split(','));
// console.log('char at ',mystring.codePointAt(0));
// console.log('char at ',mystring.startsWith('abc'));
// console.log('char at ',mystring.substr(2));
// console.log('char at ',mystring.substr(2,2));
// console.log('char at ',mystring.substring(2,3));
// console.log('char at ',mystring.toUpperCase());
// console.log('char at ',mystring.trim());
var mynumber = 1; // - , + , undefined 
var mybool = true; // false, true , undefined
var myarray = [];
myarray.push('1'); // 0
myarray.push('2'); // 1
myarray.push('true'); // 2
// console.log(myarray[0]);
console.log(myarray);
console.log(myarray.reverse());
var myarray2 = myarray.reverse().concat([]);
//myarray.shift();
myarray2.shift();
console.log('myarray ', myarray);
console.log('myarray ', myarray2);
var myconcat = myarray.concat([]);
myarray.shift();
console.log('concat', myconcat);
var mynumber1 = 1;
var mynumber2 = 2;
mynumber1 = mynumber2;
mynumber1 = mynumber2;
var myobj = {};
var myobj1 = {};
var head = {};
head.haircolor = 'black';
head.nose = true;
console.log('my head', head);
// OOP
// WALLET
// ENUM
var currencies;
(function (currencies) {
    currencies["KIP"] = "KIP";
    currencies["USD"] = "USD";
    currencies["THB"] = "THB";
})(currencies = exports.currencies || (exports.currencies = {}));
//()=>{
var mywallet = {};
mywallet.owner = 'me';
mywallet.amount = 0;
mywallet.created_time = (new Date()).toString();
mywallet.updateed_time = (new Date()).toString();
mywallet.currency = 'KIP';
mywallet.pay = (amount, receiver) => {
    mywallet.amount -= amount;
    if (!mywallet.receiver || mywallet.receiver != null || mywallet.receiver != undefined) { // true false
        mywallet.receiver = [];
    }
    const r = {};
    r.amount = amount;
    r.created_time = (new Date()).toString();
    r.updated_time = (new Date()).toString();
    r.name = receiver;
    mywallet.receiver.push(r);
    return 'ok';
};
mywallet.receive = (amount, sender) => {
    mywallet.amount += amount;
    if (!mywallet.senders || mywallet.senders != null || mywallet.senders != undefined) { // true false
        mywallet.senders = [];
    }
    const s = {};
    s.amount = amount;
    s.created_time = (new Date()).toString();
    s.updated_time = (new Date()).toString();
    s.name = sender;
    mywallet.senders.push(s);
    return 'ok';
};
// mywallet.receive(1000,'you');
// mywallet.pay(500,'friend');
// console.log(mywallet);
//}
// CLASS
class cWallet {
    constructor(owner = '', currency = '', amount = 100, created_time = '', updated_time = '') {
        this.senders = [];
        this.receiver = [];
        this.currency = currency;
        this.amount = amount;
        this.created_time = created_time;
        this.updateed_time = updated_time;
        this.owner = owner;
    }
    pay(amount, receiver) {
        this.amount -= amount;
        if (!this.receiver || this.receiver != null || this.receiver != undefined) { // true false
            this.receiver = [];
        }
        const r = {};
        r.amount = amount;
        r.created_time = (new Date()).toString();
        r.updated_time = (new Date()).toString();
        r.name = receiver;
        this.receiver.push(r);
        return 'ok';
    }
    receive(amount, sender) {
        this.amount += amount;
        if (!this.senders || this.senders != null || this.senders != undefined) { // true false
            this.senders = [];
        }
        const s = {};
        s.amount = amount;
        s.created_time = (new Date()).toString();
        s.updated_time = (new Date()).toString();
        s.name = sender;
        this.senders.push(s);
        return 'ok';
    }
}
exports.cWallet = cWallet;
var myCWallet = new cWallet('touy', currencies.KIP, 0, new Date().toString(), new Date().toString());
myCWallet.receive(1000, 'you');
myCWallet.pay(500, 'friend');
console.log('my CWallet', myCWallet);
console.log(JSON.stringify(myCWallet));
// IF
// TRUE , FALSE
// || ຫຼື
// && ແລະ 
// >
// <
// >=
// <=
//  ===
// !
// !==
if (true || false) {
    console.log('true || false');
}
if (true && false) {
    console.log('true && false');
}
if (false && false) {
    console.log('false && false');
}
if (true && true) {
    console.log('true && true');
}
if (1 < 0) {
    console.log('1<0');
}
if (1 > 0) {
    console.log('1>0');
}
var n1 = 1;
var n2 = 0;
if (n1 === n2) {
    console.log('n1===n2');
}
if (n1 !== n2) {
    console.log('n1!==n2');
}
if (n1 >= n2) {
    console.log('n1>=n2');
}
if (n1 <= n2) {
    console.log('n1<=n2');
}
if (n2) {
    console.log('n2');
}
if (!n2) {
    console.log('!n2');
}
var n3 = 3;
if (n3 === 0) {
    console.log('0');
}
else if (n3 === 1) {
    console.log('1');
}
else if (n3 === 2) {
    console.log('2');
}
else {
    console.log('3');
}
// short if
console.log(checkN3());
function checkN3() {
    return n3 === 1 ? '3' : 'flase';
}
var myDay;
(function (myDay) {
    myDay["Monday"] = "Monday";
    myDay["Tuesday"] = "Tuesday";
    myDay["Wednesday"] = "Wednesday";
    myDay["Thursday"] = "Thursday";
    myDay["Friday"] = "Friday";
    myDay["Saturday"] = "Saturday";
    myDay["Sunday"] = "Sunday";
})(myDay || (myDay = {}));
let day = myDay.Sunday;
switch (day) {
    case myDay.Monday:
        break;
    case myDay.Friday:
        break;
    case myDay.Sunday:
        console.log('today is ' + day);
        break;
    default:
        console.log("this is " + day);
        break;
}
// LOOP FOR , FOR OF , FOR IN , FOR EACH
//++
// var n =0;
// console.log('n',n);
// n+=1; // n = n +1
// console.log('n+=1',n);
// ++n ;
// console.log('++n',n);
// var n1 =0;
// n1 = n++; // n+=1 , n= n+1
// console.log('n++',n);
// console.log('n1 =n++',n1);
// console.log('------- n -------',n);
// console.log('n--',--n);
//--
// FOR 
var arr = [1, 2, 3, 4, 5];
for (let index = 0; index < arr.length; index++) {
    // const element = arr[index];
    // arr.push(index);
    // console.log(element);
}
// FOR OF
for (const it of arr) {
    console.log(it);
}
// FOR IN 
var obj = [
    { name: 'a', lastname: 'b' },
    { name: 'c', lastname: 'd' },
    { name: 'e', lastname: 'f' },
];
var obj1 = { name: 'I', lastname: 'J' };
for (const key in obj1) {
    console.log('key', key);
    const k = key + '';
    console.log('obj value', obj1);
    // if (obj.hasOwnProperty(key)) {
    //     const element = obj[key];
    // }
}
// while loop
var n4 = [1, 2, 3, 4, 5];
var nn = 0;
while (nn <= 0) {
    // console.log(nn++);
    nn++;
}
// do while loop
nn = 0;
do {
    nn++;
    // console.log(nn++);
} while (nn <= 0);
//  FOR IN ,FOREACH 
var boj2 = { name: 'A', lastname: 'B' };
for (const key in boj2) { // "suppressImplicitAnyIndexErrors":true,
    if (boj2.hasOwnProperty(key)) {
        const val = boj2[key];
        console.log('key ', key);
        console.log('value', val);
    }
}
// FOR EACH
var arr = [1, 2, 3, 4, 5];
arr.forEach(element => {
    console.log('element', element);
});
for (const element of arr) {
    console.log('element2', element);
}
//function , arrow function, function overloading, rest parameters
func1();
console.log('called sum', sum(1, 1));
let sk = 1;
let sk1 = 1;
// function add(a:number, b:number): number;
// function add(a:number, b:number): string;
function add(a, b) {
    return a + b;
}
add(1, 2);
// var add =function sum1(a:number,b:number):number{
//     const v = a+b;
//     console.log('called add ',v);
//     return v;
// }
// add(1,1);
function sum(a, b) {
    return a + b;
}
function func1() {
    console.log('func1');
}
// function arrow
let func2 = () => {
    console.log('func2 called');
};
func2();
let func3 = () => console.log('func3');
func3();
function Greet(greeting, ...names) {
    return greeting + " " + names.join(", ") + "!";
}
function Greet2(greeting, ...names) {
    names.forEach(e => {
        console.log('greet2', greeting + ' ' + e);
    });
}
Greet2('welcome', 'a', 'b', 'c');
function Greet3(greeting, names) {
    names.forEach(e => {
        console.log('greet23', greeting + ' ' + e);
    });
}
Greet3('welcome', ['a', 'b', 'c']);
function Greet4(greeting = '', names = [], age = 0) {
    console.log('greet4');
    names.forEach(e => {
        console.log('greet4', greeting + ' ' + e);
    });
}
Greet4('', [], 10);
class Objx {
    constructor(name = '') {
        this.name = '';
        this.lastname = '';
        this.age = 0;
        this.name = name ? name : 'mr.';
    }
    show() {
        console.log('show Objx', this.name, this.age, this.lastname);
    }
}
let objx = new Objx();
objx.show();
class Employee {
    constructor(empcode, name) {
        this.empCode = empcode;
        this.name = name;
        this.lastName = '';
        this.age = 0;
        this.position = '';
    }
    display() {
        console.log("Name = " + this.name + ", Employee Code = " + this.empCode);
    }
}
class Member extends Employee {
    show() {
        this.display();
    }
}
var m = new Member(123, 'A');
m.show();
// B.EP19 module, export // - NAMSPACE
var mytruple = ['', 1];
var myenum;
(function (myenum) {
    myenum[myenum["Newspaper"] = 1] = "Newspaper";
    myenum[myenum["Newsletter"] = 5] = "Newsletter";
    myenum[myenum["Magazine"] = 5] = "Magazine";
    myenum[myenum["Book"] = 10] = "Book";
})(myenum || (myenum = {}));
var myenum2;
(function (myenum2) {
    myenum2["Newspaper"] = "Newspaper";
    myenum2["Newsletter"] = "Newsletter";
    myenum2["Magazine"] = "Magazine";
    myenum2["Book"] = "Book";
})(myenum2 || (myenum2 = {}));
var myuniion = true;
var myany = [];
var myvoid2 = undefined;
function mvoid() {
}
var myvoid3 = mvoid();
myvoid3;
