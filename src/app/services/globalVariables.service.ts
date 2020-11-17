import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class globalVariables{

    public  apiURL: string = "http://amoriello.ownip.net:3000/";
    public  apiVersion: string = "api/v1/";
    public  apiUser: string = "users/"
    public  apiMatch: string = "matches/";


}