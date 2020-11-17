import { UserModel } from './userModel';


export class webUserModel extends UserModel{
    

    public token:string;

    constructor(){
        super();
        this.token = "";
    }

    setWebUser(user, token){
        super.setUser(user);
        this.token = token;
    }
}