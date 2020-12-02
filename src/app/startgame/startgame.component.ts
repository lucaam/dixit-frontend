import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { CookieService } from 'ngx-cookie-service';
import { matchNgService } from '../services/matchNg.service';

@Component({
  selector: 'app-startgame',
  templateUrl: './startgame.component.html',
  styleUrls: ['./startgame.component.scss']
})
export class StartgameComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private matchService: MatchService,
              private _router: Router,
              private route: ActivatedRoute,
              private cookieService: CookieService,
              private matchNgService: matchNgService) { }



  createMatchForm = this.fb.group({
    name: ['' , [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
    expectedPlayers: ['', [ Validators.required, Validators.min(3), Validators.max(12)] ]
  });

  joinMatchForm = this.fb.group({
    name: ['' , [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
  });

  ngOnInit(): void {
    if(this.cookieService.get('user-id')==undefined || localStorage.getItem('user') == undefined || this.cookieService.get('user-id')=='' || localStorage.getItem('user') == '' || localStorage.getItem('user').length == 0 ){
      this._router.navigateByUrl('/');
      return
    }

    localStorage.removeItem('revealCards');
    localStorage.removeItem('cardSelected');
    localStorage.removeItem('cardAdded');
    localStorage.removeItem('match');
    localStorage.removeItem('cardsOnTable');
    localStorage.removeItem('cardsInHand');

    console.log(JSON.parse(localStorage.getItem('user')) )
  }

  createMatch(): void{
    console.log(this.createMatchForm.value);

    this.matchService.createMatch(this.createMatchForm.value).then(result =>
      {
        if(result.status === 200){
          this.matchNgService.changeMatch(result.body);
          this._router.navigateByUrl('/diximainpage');
        }
        console.log(result);
      });

  }

  joinMatch(): void{
    console.log(this.joinMatchForm.value);
    this.matchService.joinMatch(this.joinMatchForm.value).then(result =>{
      console.log(result);
      if ( result.status === 200 ){
        this.matchNgService.changeMatch(result.body);
        this._router.navigateByUrl('/diximainpage');
      }
    });

  }

}
