import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { TrackingService } from './tracking.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { Server, Socket } from 'socket.io';
import { ConflictException, Logger } from '@nestjs/common';
import { IPositionReport } from './dto/posRep.dto'

@WebSocketGateway()
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  logger = new Logger("Tracking Gateway");

  mappings: socketFlightMapping[] = [];

  @WebSocketServer()
  server: Server;
  
  constructor(private readonly trackingService: TrackingService) { }

  afterInit() {
    this.logger.log("Tracking Gateway running");
  }

  handleConnection(socket: Socket): void {
    this.logger.verbose(`Socket ${socket.id} connected`);
  }

  handleDisconnect(socket: Socket): void {
    this.logger.verbose(`Socket ${socket.id} disconnected`);
    const mapping = this.mappings.find((candidate) => candidate.socketId === socket.id);
    if (mapping){
      this.trackingService.remove(mapping.flightNo);
    }
  }

  @SubscribeMessage('createFlight')
  async create(@MessageBody() createFlightDto: CreateFlightDto, @ConnectedSocket() client: Socket) {
    try {
      await this.trackingService.create(createFlightDto);
      this.mappings.push({flightNo: createFlightDto.flightNumber, socketId: client.id});
      client.emit('createFlight', {success: true, message: 'success'});
    } catch (error) {
      client.emit('createFlight', {success: false, message: error.message});
    }
  }

  @SubscribeMessage('trackingData')
  test(@MessageBody() data: IPositionReport) {
    this.trackingService.onTrackingData(data);
  }
}

interface socketFlightMapping {
  flightNo: string;
  socketId: string;
}
