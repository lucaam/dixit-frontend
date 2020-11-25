import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CardModel } from '../classes/cardModel';
import { MatchModel } from '../classes/matchModel';
import { UserModel } from '../classes/userModel';
import { webUserModel } from '../classes/webUserModel';
import { matchNgService } from '../services/matchNg.service';
import { SocketioService } from '../services/socketio.service';
import { webUserNgService } from '../services/userNg.service';

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
  constructor(private matchNgService: matchNgService,
              private userNgService: webUserNgService,
              private socketService: SocketioService) { }

  async ngOnInit() {
    this.matchNgService.matchshared.subscribe(match => {
      this.Match = match;
     
    });
    this.userNgService.webUsershared.subscribe(user => {
      this.User = user;
      console.log("this.user", this.User);
      console.log("user", user);

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
        console.log('newUserReady');

        console.log(data);
      });

      this.socketService.socket.on('readyToStart', (data) => {

        console.log('we are ready to start');

        console.log(data);

      });

      this.socketService.socket.on('newCardOnTable', (data) => {

        console.log('There is a new card on table');
        console.log(data);

        this.CardsOnTable.push(data);

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


      });
    }

  }

  getCard() {

  }



  addCardOnTable(selectedCard) {
    console.log('Add a card on table');
    console.log(selectedCard);
    this.socketService.addCardOnTable(this.User,selectedCard, this.Match).then(res =>
      console.log(res)
      );
      this.CardsOnTable.push(selectedCard);
  }

  selectCard(selectedCardOnTable) {
    console.log('Select a card that is on the table');
    console.log( this.Match);
    this.socketService.selectCardOnTable(this.User,selectedCardOnTable, this.Match).then(res =>
      console.log(res)
      );

  }

  readyToPlay() {
    console.log(this.User);
  
    this.socketService.readyToPlay(this.User, this.Match);

  }

}
