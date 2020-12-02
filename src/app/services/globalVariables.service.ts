import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class globalVariables{

    public  apiURL: string = environment.ENDPOINT;
    public  apiVersion: string = 'api/v1/';
    public  apiUser: string = 'users/';
    public  apiCard: string = 'cards/';
    public  apiMatch: string = 'matches/';


}