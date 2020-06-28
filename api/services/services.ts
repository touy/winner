class Services{
    public accessTokenSecret = 'fdsasdfkasfnsalvsad2134t3fhzchfq4foufpqw';

    constructor(){

    }
    okRes(data:any,message:string = ''):any{
        message=message?message:'ok'
        return {message,data,code:1};
    }
    errRes(data:any = {},message:string ='',code:number=0):any{
        message=message?message:'error';
        code = code ? code : 0;
        return {message,data,code};
    }
    public generatePassword(length:number = 6):string {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    public isUser(e:userType){
        if(e==userType.user)return true;
        return false;
    }
    public isSuperAdmin(e:userType){
        if(e==userType.superadmin)return true;
        return false;
    }
    public isAdmin(e:userType){
        if(e==userType.admin)return true;
        return false;
    }
    
    public isAuthorized(e:userType){
        if(e==userType.superadmin||e==userType.user)return true;
        return false;
    }
    // public getDeviceStatus(){
    //     return JSON.stringify(EDeviceStatus);
    // }
}
export enum userType{
    user ='user',
    superadmin = 'superadmin',
    admin = 'admin'
}
export default new Services();