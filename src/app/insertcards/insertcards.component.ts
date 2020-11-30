import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InsertcardsService } from '../services/insertcards.service';

@Component({
  selector: 'app-insertcards',
  templateUrl: './insertcards.component.html',
  styleUrls: ['./insertcards.component.scss']
})
export class InsertcardsComponent implements OnInit {

  cardSent: boolean = false;
  buttonClicked: boolean = false;
  cardInserted: boolean;

  constructor(private fb: FormBuilder,
              private insertCardService: InsertcardsService,
              private _router: Router) { }

  insertCardForm = this.fb.group({
    name: ['', [
      Validators.required, Validators.minLength(3)
    ]],
    picture: ['', [Validators.required, Validators.minLength(4)]
      ],
  });


  ngOnInit(): void {
    // this.userService.getUserProfile("luca.amoriello@hotmail.it").then(result =>{
    //     console.log(result);
    // });
  }


  insertCard() {
    this.cardSent = true;
    this.buttonClicked = true;
    let _ = this;
    _.insertCardService.insertCard(this.insertCardForm.value).then(res => {
      
        if(res.status == 200){

          _.cardInserted = true;
          _.cardSent = false;
          setTimeout(function () {
            _.buttonClicked = false;
            
         }, 4000);
       

        }
    }).catch(err => {
      if(err.status == 400){
        _.cardInserted = false;
        _.cardSent = false;
        setTimeout(function () {
          _.buttonClicked = false;
          
       }, 4000);
       }
    });


  }
}
