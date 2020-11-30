import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { webUserNgService } from '../services/userNg.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private userService : UserService,
    private webUserNgService : webUserNgService) { }

  registrationForm = this.fb.group({
    name: ['' ,Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    surname: ['',Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    email: ['', [
      Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      
    username: ['',Validators.required, Validators.minLength(4), Validators.maxLength(255)],
    password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/) ]],
  })

  ngOnInit(): void {
    this.webUserNgService.webUsershared.subscribe(message=>{
      console.log(message);
    })
  }

  createUser(){
    this.userService.addNewUser(this.registrationForm.value).then(res =>{
      console.log(res);
    })
  }

}
