import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { CardModel } from '../classes/cardModel';
import { MatchModel } from '../classes/matchModel';
import { UserModel } from '../classes/userModel';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket:Socket;

  constructor() {   }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  async joinMatch(match){
    return this.socket.emit('join', match);
  }


  async readyToPlay(user: UserModel, match: MatchModel){
    console.log('what I am passing is this user + ', user);
    console.log('what I am passing is this match + ', match);

    return this.socket.emit('readyToPlay', { user: user, match: match });
  }

  async addCardOnTable(User: UserModel, card: CardModel, match: MatchModel){
    return this.socket.emit('addCardOnTable',{ user: User, match: match, card: card });
  }

  async selectCardOnTable(User: UserModel, card: CardModel, match: MatchModel){
    return this.socket.emit('selectCard', { user: User, match: match, card: card });
  }

  async readyToStart(){
    return this.socket.on('readyToStart', (data) => {
      console.log(data);
      return data;
     });
   }

  async assignedCards(){
   return this.socket.on('assignedCards', (data) => {
     console.log(data);
     return data;
    });
  }
}
