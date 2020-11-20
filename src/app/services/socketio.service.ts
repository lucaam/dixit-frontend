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
    return await this.socket.emit("join",match);
  }


  async readyToPlay(User:UserModel, match: MatchModel){
    return await this.socket.emit("readyToPlay",{user: User, match: match});
  }

  async readyToStart(){
    return await this.socket.on('readyToStart', (data)=> {
      console.log(data)
      return data;
     });
   }

  async assignedCards(){
   return await this.socket.on('assignedCards', (data)=> {
     console.log(data);
     return data;
    });
  }
}
