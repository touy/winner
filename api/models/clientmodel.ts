export interface IClient {
    username: string;
    password: string;
    phonenumber: number;
    // user1:string;
    // user2:string;
    // user3:string;
    // userArry :string[];
    selectGame():void;// ເລືອກເກມ
    playGame():boolean; // ຫຼີ້ນເກມ
    history():any[]; // ສະແດງປະຫວັດ

}
export class Client implements IClient {
    username: string;
    password: string;
    phonenumber: number;
    selectGame():void{

    };// ເລືອກເກມ
    playGame():boolean{
        return false;
    }; // ຫຼີ້ນເກມ
    history():any[]{
        return [];
    }; // ສະແດງປະຫວັດ
    constructor(c:any={}) {
        console.log('C',c);
        
        this.username = c.username;
        this.password = c.password;
        this.phonenumber = c.phonenumber;
    }
}
