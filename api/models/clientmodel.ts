interface IClient{
    username:string;
    password:string; // 'asddsfsdf'
    age:number; // 0 1 2 3 4
    gender:boolean; // true false
    showClient():void;
    setAge(age:number):number;
}
interface IUser{
    username:string;
    password:string;
}
class User implements IUser{
    username:string;
    password:string;
}
class Client implements IClient{
    username:string;
    password:string;
    age:number; // 0 1 2 3 4
    gender:boolean; // true false
    fristName:string;
    photos:string[]=[] ;
    constructor(username:string=''){
        this.username =username;
        console.log(this.photos);
        this.photos.push('photo1.png')
        this.photos.push('photo2.png')
        this.photos.push('photo3.png')
        // console.log('photos array',this.photos);
        // console.log('photos length',this.photos.length);
        
        // console.log('photos[0]',this.photos[0]);
        // console.log('photos[1]',this.photos[1]);
        // console.log('photos[1]',this.photos[2]);
        let i =0;
        i=i+2;
        i+=2;
        i++;

        for(let index=0;index<this.photos.length;index++){
            console.log('for loop');
            console.log('<div>');
            
            console.log('<h1>',this.photos[index],'</h1>');

            console.log('</div>');
        }
        let obj:IUser;
        obj = {password:'12344565',username:'touy'};
        console.log('obj1',obj);
        obj = {} as IUser;
        obj.password='123455'
        console.log('obj2',obj);
        
    }
    setAge(age:number):number{

        if(age>100){
            console.log('ERROR ຕັ້ງອາຍຸໄດ້ບໍ່ເກີນ 100');
            throw new Error('ERROR ຕັ້ງອາຍຸໄດ້ບໍ່ເກີນ 100');
           // return 0;
        }
        this.age = age;
        return this.age;
    }
    setUserName(username:string){
        this.username = username;
    }
    showClient():void{
        console.log(this);
    }
}
let c:IClient = new Client(); 
c.showClient();
c.setAge(100);
c.showClient();
