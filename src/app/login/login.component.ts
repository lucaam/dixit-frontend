import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private cookieService: CookieService) { }

  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{​​2,4}​​$")]],
      password: ['', [Validators.required]],
  })

  ngOnInit(): void {
    // this.userService.getUserProfile("luca.amoriello@hotmail.it").then(result =>{
    //     console.log(result);
    // });
  }

  sendLogin() {
    let _ = this;
    console.log(this.loginForm.value);
    _.loginService.sendLogin(this.loginForm.value).then(res =>{
      var webUser = new webUserModel();
      console.log(res.body['user']);
      webUser.setWebUser(res.body['user'], res.body['token']);
      _.webUserNgService.changeWebUser(webUser);
      console.log(webUser);
      this.cookieService.set('auth-token', webUser.token);
      
      this.cookieService.set('user-id', webUser._id);
    });
    
  }

}