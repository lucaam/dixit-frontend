import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { webUserModel } from '../classes/webUserModel';
import { globalVariables } from '../services/globalVariables.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { webUserNgService } from '../services/userNg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private fb: FormBuilder, 
    private loginService: LoginService, 
    private webUserNgService : webUserNgService, 
    private cookieService: CookieService,
    private _router: Router) { }

  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
  })

  ngOnInit(): void {
    // this.userService.getUserProfile("luca.amoriello@hotmail.it").then(result =>{
    //     console.log(result);
    // });

          // Instead of removing everything we should retrive latest information about the user and set them into cookies/localstorage
        localStorage.removeItem('revealCards');
        localStorage.removeItem('cardSelected');
        localStorage.removeItem('cardAdded');
        localStorage.removeItem('match');
        localStorage.removeItem('cardsOnTable');
        localStorage.removeItem('user');
        localStorage.removeItem('cardsInHand');
        this.cookieService.deleteAll();
  }

  sendLogin() {
    let _ = this;
    _.loginService.sendLogin(this.loginForm.value).then(res =>{
      var webUser = new webUserModel();
      webUser.setWebUser(res.body['user'], res.body['token']);
      localStorage.setItem('user', JSON.stringify(webUser));
      _.webUserNgService.changeWebUser(webUser);
      this.cookieService.set('auth-token', webUser.token);
      this.cookieService.set('user-id', webUser._id);
      this._router.navigateByUrl('/startgame');
    });
    
  }

}