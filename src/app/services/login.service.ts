import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalVariables } from './globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor( private globalVariables:globalVariables, private http:HttpClient) { }


  async sendLogin(data: any) {

    return  await this.http.post
       (this.globalVariables.apiURL+"api/v1/users/login",
         data, { observe: 'response' }).toPromise();
   }

}
