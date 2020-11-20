import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
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


  async readyToPlay(User: UserModel, match: MatchModel){
    return this.socket.emit('readyToPlay', { user: User, match: match });
  }

  async addCardOnTable(User: UserModel, match: MatchModel){
    return this.socket.emit('addCardOnTable', { card: User.card, match: match });
  }

  async selectCard(User: UserModel, match: MatchModel){
    return this.socket.emit('selectCard', { user: User, match: match });
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
