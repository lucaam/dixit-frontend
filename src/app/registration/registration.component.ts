import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { webUserNgService } from '../services/userNg.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  public emailError: boolean
  public genericError: boolean
  public usernameError: boolean
  public registrationSuccess: boolean

  constructor(private fb: FormBuilder,
    private userService : UserService,
    private router: Router,
    private webUserNgService : webUserNgService) { }

  registrationForm = this.fb.group({
    name: ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    email: ['', [
      Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      
    username: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/) ]],
  })

  ngOnInit(): void {
    this.webUserNgService.webUsershared.subscribe(message=>{
      console.log(message);
    })
  }

  createUser(){
    let _ = this

    _.userService.addNewUser(this.registrationForm.value).then(res =>{

      if(res.status == 200){
        this.registrationSuccess = true
        setTimeout(function () {
          _.router.navigate(['/'])
        }, 6000);

      }
    }).catch(error => {
      console.log(error)
      if (error.status == 400 && (error.error == "Email already exists" || error.error == '"email" must be a valid email')){
        this.emailError = true
        setTimeout(function () {
          _.emailError = false
        }, 4000);
      }else if(error.status == 400 && error.error == "Username already exists"){
        this.usernameError = true
        setTimeout(function () {
          _.usernameError = false
        }, 4000);
      }else{
        this.genericError = true
        setTimeout(function () {
          _.genericError = false
        }, 4000);
      }
    })
  }

}
