import { CardModel } from './cardModel';


export class UserModel {

    public _id: string;
    public name:string;
    public surname:string;
    public username:string;
    public email:string;
    public password:string;
    public registrationDate:Date;
    public lastLogin:Date;
    public role:string;
    public cards: Array<CardModel>;
    public card: CardModel;
    public score:number;
    public victories:number;
    public defeats: number;
    public avatar: string;


    constructor(){
        this.name = "";
        this._id = "";
        this.surname = "";
        this.username = "";
        this.email = "";
        this.password = "";
        this.registrationDate = new Date();
        this.lastLogin = new Date();
        this.role = "";
        this.cards = new Array<CardModel>();
        this.card = new CardModel();
        this.score = 0;
        this.victories = 0;
        this.defeats = 0;
        this.avatar = "";
    }

    setUser(user){
        this._id = user._id;
        this.name = user.name;
        this.surname = user.surname;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.registrationDate = user.registrationDate;
        this.lastLogin = user.lastLogin;
        this.role = user.role;
        this.cards = user.cards;
        this.card = user.card;
        this.score = user.score;
        this.victories = user.victories;
        this.defeats = user.defeats;
        this.avatar = user.avatar;
    }
}