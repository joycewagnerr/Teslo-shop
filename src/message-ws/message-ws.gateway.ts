import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  
  constructor(
    private readonly messageWsService: MessageWsService
    
  ) {}
  handleConnection( client: Socket ) {
    console.log('cliente conectado:', client.id );
  }
  handleDisconnect(client: any) {
    console.log('cliente desconectado:', client.id );
  }


}
