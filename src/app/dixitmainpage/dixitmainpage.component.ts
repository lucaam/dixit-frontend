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

@Component({
  selector: 'app-dixitmainpage',
  templateUrl: './dixitmainpage.component.html',
  styleUrls: ['./dixitmainpage.component.scss']
})
export class DixitmainpageComponent implements OnInit {
  Match: MatchModel = new MatchModel();
  User: webUserModel = new webUserModel();
  CardsInHand: Array<CardModel> = new Array<CardModel>();
  revealCards: boolean = false;
  CardsOnTable: Array<CardModel> = new Array<CardModel>();
  public browserRefresh: boolean;


  // Will allow the user click on his card when false
  cardAdded: boolean = true;

  // Will allow the user select a card on the table when it is false
  cardSelected: boolean = false;
  constructor(private matchNgService: matchNgService,
    private userNgService: webUserNgService,
    private socketService: SocketioService,
    private router: Router) { }

  async ngOnInit() {

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
      }

    });


    this.userNgService.webUsershared.subscribe(user => {
      this.User = user;
      if(browserRefresh){
        //restore from local storage
        console.log("Restore from local storage");
        this.User = JSON.parse(localStorage.getItem('user'));
  
        console.log("User restored: " + this.User.username);
      }
    });

    


    if (this.Match !== undefined && this.User !== undefined) {
      this.socketService.setupSocketConnection();

      this.socketService.joinMatch(this.Match);

      this.socketService.socket.on('assignedCards', (data) => {
        console.log(data);

        this.CardsInHand = data.cards;
        console.log('this.cards = ', this.CardsInHand);//carte da visualizzare per l'utente 7

      });


      this.socketService.socket.on('newUserReady', (data) => {

        // Happens when a user click on button "Pronto a giocare"
        console.log('newUserReady');
        this.Match.users.push(data);
        console.log(data);
      });

      this.socketService.socket.on('readyToStart', (data) => {

        console.log('we are ready to start');

        // Happens when all players clicked on button "Pronto a giocare"
        this.cardAdded = false;

        console.log(data);

      });

      this.socketService.socket.on('newCardOnTable', (data) => {
        this.CardsOnTable.push(data);
        console.log('There is a new card on table');
        console.log(data);


      });

      this.socketService.socket.on('newCardSelected', (data) => {

        console.log('A user selected a card');

        console.log(data);

      });

      this.socketService.socket.on('turnStart', (data) => {

        console.log('Turn start');
        console.log(data);
        this.revealCards = true;
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

      });

      this.socketService.socket.on('endMatch', (data) => {
        console.log('Someone won');
        console.log(data);


      });

    }

  }



  addCardOnTable(selectedCard) {
    console.log('Add a card on table');
    console.log(selectedCard);
    this.cardAdded = true;

    this.CardsOnTable.push(selectedCard);
    this.socketService.addCardOnTable(this.User, selectedCard, this.Match).then(res =>
      console.log(res)
    );

  }

  selectCard(selectedCardOnTable) {
    console.log('Select a card that is on the table');
    console.log(this.Match);
    this.cardSelected = true;

    this.socketService.selectCardOnTable(this.User, selectedCardOnTable, this.Match).then(res =>
      console.log(res)
    );

  }

  readyToPlay() {
    console.log(this.User);

    this.socketService.readyToPlay(this.User, this.Match);

  }

}
