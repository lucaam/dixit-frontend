import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieDixiService } from './cookiedixit.service';
import { globalVariables } from './globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private globalVariables: globalVariables, private http: HttpClient,
    private cookieDixi: CookieDixiService) { }


  async createMatch(data: any) {
    let headers = new HttpHeaders();
    headers = headers.append('auth-token', this.cookieDixi.getAuthTokenFromCookie());
    return await this.http.post(this.globalVariables.apiURL + this.globalVariables.apiVersion
      + this.globalVariables.apiMatch, data, { headers: headers, observe: 'response' }).toPromise();
  }

  async joinMatch(namematch: string) {
    let headers = new HttpHeaders();
    headers = headers.append('auth-token', this.cookieDixi.getAuthTokenFromCookie());
    return await this.http.post(this.globalVariables.apiURL + this.globalVariables.apiVersion
      + this.globalVariables.apiMatch + "/join", namematch, { headers: headers, observe: 'response' }).toPromise();
  }
}

