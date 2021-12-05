var mongoose = require('mongoose');
const messageTemplateCopy = require('../../models/chatModel');

import {
    ConnectedSocket,
    MessageBody,
    OnConnect,
    OnMessage,
    SocketController,
    SocketIO,
  } from "socket-controllers";
  import { Server, Socket } from "socket.io";

  @SocketController()
export class ChatController {
   private getSocketChatRoom(socket: Socket): string {
        const socketRooms = Array.from(socket.rooms.values()).filter(
          (r) => r !== socket.id
        );
        const gameRoom = socketRooms && socketRooms[0];
    
        return gameRoom;
    }

    @OnMessage("send_message")
    public async sendMessage(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log("new message: ", message);

    //when I have multiple DB's in same project I should seperate them by this createConnetion:
    const conn = mongoose.createConnection("mongodb+srv://users:users@cluster0.tv6y5.mongodb.net/chat?retryWrites=true&w=majority");
    //conn.model('chat', require('../../models/chatModel'));
    
    //the schema:
    const sentMessage = new messageTemplateCopy({
      content: message.message,
      sender: message.username,
      date: message.date
  })

    io.emit("new_send_message", message);

    //saving into DB
    sentMessage.save()
      .then(data => { console.log(data) })
      .catch(err => { console.log(err) })

//export the connection
module.exports = conn;

  }
    @OnMessage("Disconect")
    public async Disconect(
      @SocketIO() io: Server,
      @ConnectedSocket() socket: Socket,
      @MessageBody() message: any
    ) {
        const gameRoom = this.getSocketChatRoom(socket);
      socket.leave(gameRoom)
    }
}