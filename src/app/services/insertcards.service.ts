import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalVariables } from './globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class InsertcardsService {
  

  constructor( private globalVariables:globalVariables, private http:HttpClient) { }


  async insertCard(data: any) {

    return await this.http.post
       (this.globalVariables.apiURL + this.globalVariables.apiVersion + this.globalVariables.apiCard,
         data, { observe: 'response' }).toPromise();
   }

}
