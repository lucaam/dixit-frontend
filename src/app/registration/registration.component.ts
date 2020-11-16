import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  registrationForm = this.fb.group({
    name: ['' ,Validators.required],
    surname: ['',Validators.required],
    email: ['', [
      Validators.required]],
      // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{​​2,4}​​$")
    username: ['',Validators.required],
    password: ['', [Validators.required]],
  })

  ngOnInit(): void {
  }

  createUser(){
    console.log(this.registrationForm.value);
  }

}
