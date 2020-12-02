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
    if(this.cookieService.get('user-id')==undefined || localStorage.getItem('user') == undefined ){
      this._router.navigateByUrl('/');
      return
    }
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
