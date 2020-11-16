import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalVariables } from './globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyNWQ2YWJjNTg5YWE5NDgyM2FkODgiLCJpYXQiOjE2MDU1NTE4MjF9.L4ahXWdoD_5JJVS3Yic_7uiLrr0KT19GIqXE77pMobo
constructor(private globalVariables: globalVariables, private http:HttpClient) { }

async getUserProfile(id: any) {
  let headers = new HttpHeaders();
  headers = headers.append('auth-token',
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyNWQ2YWJjNTg5YWE5NDgyM2FkODgiLCJpYXQiOjE2MDU1NTI5NDF9.qD7YKPHDOavfEz5VZk0hUM9RxT8yeiTNjfCpGB-ZvHo");
  //  console.log(this.globalVariables.apiURL+this.globalVariables.apiVersion 
  // + this.globalVariables.apiUser + id); 
 return  await this.http.get
     (this.globalVariables.apiURL+this.globalVariables.apiVersion 
      + this.globalVariables.apiUser + id,{headers: headers}).toPromise();
 }


}
