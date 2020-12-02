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

  public emailError: boolean
  public passwordError: boolean


  constructor(private fb: FormBuilder, 
    private loginService: LoginService, 
    private webUserNgService : webUserNgService, 
    private cookieService: CookieService,
    private userService: UserService,
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
        localStorage.removeItem('cardsInHand');

        if(this.cookieService.get('user-id') !=undefined && this.cookieService.get('user-id')!=null && this.cookieService.get('user-id')!='' && localStorage.getItem('user') != undefined && localStorage.getItem('user') != '' ){

          localStorage.setItem('user', JSON.stringify(this.userService.getUserProfile(this.cookieService.get('user-id'), JSON.parse(localStorage.getItem('user')))))
          this._router.navigateByUrl('/startgame');
          return
        }

  }

  sendLogin() {
    let _ = this;
    this.emailError = false
    this.passwordError = false

    _.loginService.sendLogin(this.loginForm.value).then(res =>{
      if(res.status == 200){
        var webUser = new webUserModel();
      webUser.setWebUser(res.body['user'], res.body['token']);
      localStorage.setItem('user', JSON.stringify(webUser));
      _.webUserNgService.changeWebUser(webUser);
      this.cookieService.set('auth-token', webUser.token);
      this.cookieService.set('user-id', webUser._id);
      this._router.navigateByUrl('/startgame');
      } 
    }).catch(err => {
      if(err.status == 400 && (err.error == "EMAIL or password is wrong" || err.error == '"email" must be a valid email')){
        this.emailError = true
        setTimeout(function () {
          _.emailError = false
        }, 4000);
      } else if(err.status == 400 && err.error  == "Email or PASSWORD is wrong"){
        this.passwordError = true
        setTimeout(function () {
          _.passwordError = false
        }, 4000);
      }
    });
    
  }

}