import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CardModel } from '../classes/cardModel';
import { MatchModel } from '../classes/matchModel';
import { UserModel } from '../classes/userModel';
import { webUserModel } from '../classes/webUserModel';
import { matchNgService } from '../services/matchNg.service';
import { SocketioService } from '../services/socketio.service';
import { webUserNgService } from '../services/userNg.service';
import { browserRefresh } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dixitmainpage',
  templateUrl: './dixitmainpage.component.html',
  styleUrls: ['./dixitmainpage.component.scss']
})
export class DixitmainpageComponent implements OnInit {
  environment = environment;

  Match: MatchModel = new MatchModel();
  User: webUserModel = new webUserModel();
  CardsInHand: Array<CardModel> = new Array<CardModel>();
  UsersWon: Array<UserModel> = new Array<UserModel>();
  revealCards: boolean = false;
  CardsOnTable: Array<CardModel> = new Array<CardModel>();
  forceEnd: boolean = false;
  forceStart: boolean = false;
  forceReady: boolean = true;

  cardsSelected: number = 0;
  usersReady: number = 0;

  public browserRefresh: boolean;

  clickedReady: boolean = false;
  matchEnded: boolean = false;
  // Will allow the user click on his card when false
  cardAdded: boolean = true;

  // Will allow the user select a card on the table when it is false
  cardSelected: boolean = false;
  constructor(private matchNgService: matchNgService,
    private userNgService: webUserNgService,
    private socketService: SocketioService,
    private cookieService: CookieService,
    private router: Router) { }

  async ngOnInit() {

    if(this.cookieService.get('user-id')==undefined || localStorage.getItem('user') == undefined ){
      this.router.navigateByUrl('/');
      return
    }

    this.browserRefresh = browserRefresh;

      

    this.matchNgService.matchshared.subscribe(match => {
      this.Match = match;
      if(!browserRefresh){
        //restore from local storage
        localStorage.setItem('match', JSON.stringify(this.Match));
        console.log("Match setted: " + this.Match.name);
      }
      if(browserRefresh){
        //restore from local storage
        this.Match = JSON.parse(localStorage.getItem('match'));
        console.log("Match restored: " + this.Match.name);
        console.log("Match restored: users length" + this.Match.users.length);

      }

    });


    this.userNgService.webUsershared.subscribe(user => {
      this.User = user;
      console.log("user shared + ", user)
      if(this.User == undefined || this.User == null || this.User.username == undefined){
        console.log("this.User shared was null")
        this.User = JSON.parse(localStorage.getItem('user'));
        
      }else {
        if(!browserRefresh){
          // Set user to local storage if is not null
          localStorage.setItem('user', JSON.stringify(this.User));
          console.log("User setted: " + this.User.name);
        }
      }
      if(browserRefresh){
        //restore from local storage
        console.log("Restore from local storage");
        this.User = JSON.parse(localStorage.getItem('user'));
  
        console.log("User restored: " + this.User.username);
      }
      
      
    });

    if(browserRefresh){
      this.CardsInHand = JSON.parse(localStorage.getItem('cardsInHand'));
      this.CardsOnTable = JSON.parse(localStorage.getItem('cardsOnTable'));
      this.cardAdded = localStorage.getItem('cardAdded') == 'true' ? true : false
      this.cardSelected = localStorage.getItem('cardSelected') == 'true' ? true : false
      this.revealCards = localStorage.getItem('revealCards') == 'true' ? true : false
      this.clickedReady = localStorage.getItem('clickedReady') == 'true' ? true : false

      Array.from(document.getElementsByClassName("board-box")).forEach(function(item) {
        removeAllChildNodes(item)
    });

      this.Match.users.forEach(element => {
        this.generateUserSpawn(element)
      });
    }

    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }


    if (this.Match !== undefined && this.User !== undefined) {
      this.socketService.setupSocketConnection();

      this.socketService.joinMatch(this.Match);

      this.socketService.socket.on('assignedCards', (data) => {
        console.log(data);

        this.CardsInHand = data.cards;
        localStorage.setItem('cardsInHand', JSON.stringify(this.CardsInHand));

        console.log('this.cards = ', this.CardsInHand);//carte da visualizzare per l'utente 7

      });


      this.socketService.socket.on('newUserReady', (data) => {

        // Happens when a user click on button "Pronto a giocare"
        console.log('newUserReady');

        if (this.Match.users.filter(e => e.username === data.username).length == 0) {
          this.Match.users.push(data)
          this.generateUserSpawn(data)
          localStorage.setItem('match', JSON.stringify(this.Match));
        }
        
        this.usersReady += 1
        console.log("Users ready = " + this.usersReady)
        let _ = this
        // if(this.usersReady == this.Match.expectedPlayers){
        //   setTimeout(function () {
        //     _.forceReady = true
        //   }, 1000);
        // }
        console.log(data);
      });

      this.socketService.socket.on('readyToStart', (data) => {

        console.log('we are ready to start');

        // Happens when all players clicked on button "Pronto a giocare"
        this.cardAdded = false;
        this.forceReady = false
        localStorage.setItem('cardAdded', 'false');

        

        console.log(data);

      });

      this.socketService.socket.on('newCardOnTable', (data) => {
        this.CardsOnTable.push(data);
        localStorage.setItem('cardsOnTable', JSON.stringify(this.CardsOnTable));

        console.log('There is a new card on table');
        console.log("Cardontables lenght = " + this.CardsOnTable.length)
        console.log(data);

        let _ = this
        if(this.CardsOnTable.length == this.Match.expectedPlayers){
          setTimeout(function () {
            _.forceStart = true
          }, 3500);
        }


      });

      this.socketService.socket.on('newCardSelected', (data) => {

        console.log('A user selected a card');
       
        this.cardsSelected += 1
        console.log(this.cardsSelected + " numero carte selezionate")
        let _ = this
        if(this.cardsSelected == this.Match.expectedPlayers - 1){
          setTimeout(function () {
            _.forceEnd = true
          }, 3500);
        }
        console.log(data);

      });

      this.socketService.socket.on('turnStart', (data) => {

        console.log('Turn start');
        console.log(data);
        this.forceEnd = false;
        this.forceStart = false;
        this.cardsSelected = 0
        let _ = this;


        localStorage.setItem('revealCards', 'true');

        setTimeout(function () {
          _.revealCards = true;


        }, 500);
      });

      this.socketService.socket.on('turnEnded', (data) => {

        console.log('Turn is ended');
        console.log(data);

        this.User = data.users.filter((x: webUserModel) => x.username === this.User.username)[0];
        this.Match = data;
        this.CardsOnTable = [];
        this.CardsInHand = this.User.cards;
        this.revealCards = false;
        this.cardSelected = false;
        this.cardAdded = false;
        this.forceEnd = false;
        this.forceStart = false;
        this.cardsSelected = 0

        localStorage.setItem('revealCards', 'false');
        localStorage.setItem('cardSelected', 'false');
        localStorage.setItem('cardAdded', 'false');
        localStorage.setItem('match', JSON.stringify(this.Match));
        localStorage.setItem('user', JSON.stringify(this.User));
        localStorage.setItem('cardsOnTable', JSON.stringify(this.CardsOnTable));
        localStorage.setItem('cardsInHand', JSON.stringify(this.CardsInHand));
      
        Array.from(document.getElementsByClassName("board-box")).forEach(function(item) {
           removeAllChildNodes(item)
       });
        // Update tabellone
        this.Match.users.forEach(element => {
          this.generateUserSpawn(element)
        });

      });

      this.socketService.socket.on('endMatch', (data) => {
        console.log('Someone won', data);
        this.matchEnded = true;
        let _ = this;
        data.forEach(element => {
          this.UsersWon.push(element);
        });

        localStorage.removeItem('revealCards');
        localStorage.removeItem('cardSelected');
        localStorage.removeItem('cardAdded');
        localStorage.removeItem('match');
        localStorage.removeItem('cardsOnTable');
        localStorage.removeItem('user');
        localStorage.removeItem('cardsInHand');

        setTimeout(function () {
          _.router.navigate(['/']);
        }, 6000);

        console.log(data);


      });

    }

  }



  addCardOnTable(selectedCard) {
    console.log('Add a card on table');
    console.log(selectedCard);
    this.cardAdded = true;

    this.CardsOnTable.push(selectedCard);

    localStorage.setItem('cardsOnTable', JSON.stringify(this.CardsOnTable));
    localStorage.setItem('cardAdded', 'true');

    this.socketService.addCardOnTable(this.User, selectedCard, this.Match).then(res =>
      console.log(res)
    );

  }

  selectCard(selectedCardOnTable) {
    console.log('Select a card that is on the table');
    console.log(this.Match);
    this.cardSelected = true;
    this.cardsSelected+=1
    localStorage.setItem('cardSelected', 'true');
    this.socketService.selectCardOnTable(this.User, selectedCardOnTable, this.Match).then(res =>
      console.log(res)
    );

  }

  readyToPlay() {
    console.log(this.User);
    this.clickedReady = true
    this.usersReady += 1
    localStorage.setItem('clickedReady', 'true');
    this.generateUserSpawn(this.User)
    this.socketService.readyToPlay(this.User, this.Match);

  }

  forceTurnStart() {
    this.forceStart = false

    this.socketService.forceTurnStart(this.Match);

  }

  forceTurnEnd() {
    this.forceEnd = false

    this.socketService.forceTurnEnd(this.Match);

  }

  forceTurnReady() {
    this.forceReady = false

    this.socketService.forceTurnReady(this.Match);

  }

  

  generateUserSpawn(user){
    console.log(user)
     // Set user spawn to start
     let span = document.createElement('span')
     span.classList.add("pedina")
     if(user.score > 25){
      span.classList.add("text-danger")
     } else if(user.score > 15 ){
      span.classList.add("text-warning")

     }
     span.textContent = user.username.charAt(0)
     document.getElementById(user.score + "").appendChild(span)
     span.setAttribute("data-toggle", "tooltip")
     span.setAttribute("data-placement", "top")
     span.setAttribute("title", user.username + " - " + user.score + " pt")
  }
}
