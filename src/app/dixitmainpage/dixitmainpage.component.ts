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
  constructor(private matchNgService: matchNgService,
    private userNgService: webUserNgService,
    private socketService: SocketioService) { }

  async ngOnInit() {
    this.matchNgService.matchshared.subscribe(match => {
      this.Match = match;
      console.log(match);
      console.log(this.Match);
    });
    this.userNgService.webUsershared.subscribe(user => {
      this.User = user;
      console.log(this.User);
    });
    if (this.Match.name.length > 0 && this.User.name.length > 0) {
      this.socketService.setupSocketConnection();

      this.socketService.joinMatch(this.Match);

      this.socketService.socket.on('assignedCards', (data) => {
        console.log("Assigned Card");
        console.log(data);
      });

      this.socketService.socket.on('newUserReady', (data) => {
        console.log("newUserReady");

        console.log(data);
      });

      this.socketService.socket.on('readyToStart', (data) => {

        console.log("we are ready to start");

        console.log(data)

      })


    }

  }


  getCard() {

  }

  readyToPlay() {
    console.log(this.User);
  
    this.socketService.readyToPlay(this.User, this.Match);

  }

}
