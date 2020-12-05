import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { CookieService } from 'ngx-cookie-service';
import { matchNgService } from '../services/matchNg.service';
import { webUserModel } from '../classes/webUserModel';
import { browserRefresh } from '../app.component';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-startgame',
  templateUrl: './startgame.component.html',
  styleUrls: ['./startgame.component.scss'],
})
export class StartgameComponent implements OnInit {
  environment = environment;

  public matchErrorJoin: boolean = false;
  public matchErrorCreate: boolean = false;
  public authError: boolean = false;
  public authErrorCreate: boolean = false;
  public User: webUserModel = new webUserModel();
  public browserRefresh: boolean;
  public ratioWin: String;
  Math: any;
  Constructor() {
    this.Math = Math;
  }
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private matchService: MatchService,
    private _router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private matchNgService: matchNgService
  ) {}

  createMatchForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(255)],
    ],
    expectedPlayers: [
      '',
      [Validators.required, Validators.min(3), Validators.max(12)],
    ],
  });

  joinMatchForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(255)],
    ],
  });

  ngOnInit(): void {
    this.browserRefresh = browserRefresh;

    if (
      this.cookieService.get('user-id') == undefined ||
      localStorage.getItem('user') == undefined ||
      this.cookieService.get('user-id') == '' ||
      localStorage.getItem('user') == '' ||
      localStorage.getItem('user').length == 0
    ) {
      this._router.navigateByUrl('/');
      return;
    }

    localStorage.removeItem('revealCards');
    localStorage.removeItem('cardSelected');
    localStorage.removeItem('cardAdded');
    localStorage.removeItem('match');
    localStorage.removeItem('cardsOnTable');
    localStorage.removeItem('cardsInHand');

    this.User = JSON.parse(localStorage.getItem('user'));
    this.refreshData();
    if (browserRefresh) {
      // restore from local storage
      console.log('Restore from local storage');
      this.User = JSON.parse(localStorage.getItem('user'));

      console.log('User restored: ' + this.User.username);
    }

    this.ratioWin =  (this.User.victories / ( this.User.defeats + this.User.victories)  * 100).toFixed(1);
    if(this.ratioWin=='NaN'){
      this.ratioWin = "0"
    }
  }
  logout(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
    this._router.navigateByUrl('/');
  }
  createMatch(): void {
    console.log(this.createMatchForm.value);
    let _ = this;

    this.matchService
      .createMatch(this.createMatchForm.value)
      .then((result) => {
        if (result.status === 200) {
          this.matchNgService.changeMatch(result.body);
          this._router.navigateByUrl('/dixitmainpage');
        }
        console.log(result);
      })
      .catch((error) => {
        if (
          error.status == 400 &&
          error.error == 'Match with specified name already exists'
        ) {
          this.matchErrorCreate = true;
          setTimeout(function () {
            _.matchErrorCreate = false;
          }, 4000);
        } else if (error.status == 401 && error.error == 'Access denied') {
          this.authErrorCreate = true;
          setTimeout(function () {
            _.authErrorCreate = false;
            _._router.navigateByUrl('/');
          }, 4000);
        }
      });
  }

  refreshData(): void{
    this.userService
    .getUserProfile(this.cookieService.get('user-id'))
    .then((user) => {
      console.log(user)
      this.User = user.user;
    });
  }
  

  joinMatch(): void {
    console.log(this.joinMatchForm.value);
    let _ = this;

    this.matchService
      .joinMatch(this.joinMatchForm.value)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          this.matchNgService.changeMatch(result.body);
          this._router.navigateByUrl('/dixitmainpage');
        }
      })
      .catch((error) => {
        if (
          error.status == 400 &&
          error.error == 'Match with specified name does not exists'
        ) {
          this.matchErrorJoin = true;
          setTimeout(function () {
            _.matchErrorJoin = false;
          }, 4000);
        } else if (error.status == 401 && error.error == 'Access denied') {
          this.authError = true;
          setTimeout(function () {
            _.authError = false;
            _._router.navigateByUrl('/');
          }, 4000);
        }
      });
  }
}
