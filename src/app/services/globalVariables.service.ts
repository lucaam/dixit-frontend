import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class globalVariables{

    public  apiURL: string = 'http://localhost:3000/';
    public  apiVersion: string = 'api/v1/';
    public  apiUser: string = 'users/';
    public  apiCard: string = 'cards/';
    public  apiMatch: string = 'matches/';


}