import { CardModel } from './cardModel';
import { UserModel } from './userModel';


export class MatchModel{
    public name:string;
    public registrationDate: Date;
    public lastAccess:Date;
    public endDate:Date;
    public narrator:UserModel;
    public cards:Array<CardModel>;
    public users:Array<UserModel>;
    public goal:number;
    public actualPlayers:number;
    public expectedPlayers:number;

    constructor(){
        this.name = "";
        this.registrationDate = new Date();
        this.lastAccess = new Date();
        this.endDate = new Date();
        this.narrator = new UserModel();
        this.cards = new Array<CardModel>();
        this.users = new Array<UserModel>();
        this.goal  = 0;
        this.actualPlayers = 0;
        this.expectedPlayers = 0;
    }
}