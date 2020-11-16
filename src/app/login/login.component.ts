import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private fb: FormBuilder, private loginService: LoginService) { }
  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{​​2,4}​​$")]],
      password: ['', [Validators.required]],
  })

  ngOnInit(): void {
  }

  sendLogin() {
    console.log(this.loginForm.value);
    this.loginService.sendLogin(this.loginForm.value).then(res =>{
      console.log(res);
    });
  }

}