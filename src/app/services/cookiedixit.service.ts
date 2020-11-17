import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieDixiService {

  constructor(private cookieService: CookieService) { }

  getAuthTokenFromCookie(){
return this.cookieService.get('auth-token');
  }

  getUserIdFromCookie(){
    return this.cookieService.get('user-id');

  }

  setAuthTokenToCookie(){

  }

  setUserIdToCookie(){

  }
}
