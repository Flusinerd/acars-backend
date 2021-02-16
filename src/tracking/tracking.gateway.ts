import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { TrackingService } from './tracking.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { IPositionReport } from './dto/posRep.dto'

@WebSocketGateway()
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  logger = new Logger("Tracking Gateway");

  mappings: socketFlightMapping[] = [];

  timeOutDelay = 31 * 60 * 1000; // 30 Minutes in ms

  @WebSocketServer()
  server: Server;

  constructor(private readonly trackingService: TrackingService) { }

  afterInit() {
    this.logger.log("Tracking Gateway running");
    this.trackingService.flightRemoveEvent.subscribe((flightNo) => {
      const index = this.mappings.findIndex((map) => map.flightNo === flightNo);
      if (index > -1) {
        this.mappings.splice(index, 1);
      }
    })
  }

  handleConnection(socket: Socket): void {
    this.logger.verbose(`Socket ${socket.id} connected`);
    const uuid = '' + new Date().valueOf().toString(16);
    socket.emit('onConnect', uuid);
    this.mappings.push({
      socketId: socket.id,
      socketUUID: uuid,
    });
  }

  handleDisconnect(socket: Socket): void {
    this.logger.verbose(`Socket ${socket.id} disconnected`);
    const mapping = this.mappings.find((candidate) => candidate.socketId === socket.id);
    if (mapping) {
      mapping.timeOut = setTimeout(this._onSocketTimeout.bind(this, mapping), this.timeOutDelay);
    }
  }

  /**
   * Handles the removal of the socket  when it times out.
   * Deletes flight in tracking
   * Removes socket mapping
   * @param socketMap Map entry of the socket
   */
  private _onSocketTimeout(socketMap: socketFlightMapping): void {
    this.logger.verbose(`Client ${socketMap.socketId} timed out`);
    const index = this.mappings.findIndex((map) => map.socketId === socketMap.socketId);
    if (index >= 0) {
      this.logger.debug(`Removing Socket mapping ${this.mappings[index].socketUUID}`);
      if (this.mappings[index].flightNo){
        this.logger.debug(`Socket had flight connected ${this.mappings[index].flightNo}`);
        this.trackingService.remove(socketMap.flightNo);
      }
      this.mappings.splice(index, 1);
    }
  }

  private _onSocketReconnect(uuid: string, socketId: string) {
    const index = this.mappings.findIndex((map) => map.socketUUID === uuid);
    if (index > -1) {
      const timeOut = this.mappings[index].timeOut;
      if (timeOut) {
        clearTimeout(timeOut);
      }
      this.mappings[index].socketId = socketId;
      this.mappings[index].timeOut = undefined;
      
      // Find the newly created mapping and delete it
      const index2 = this.mappings.findIndex((map) => (map.socketUUID !== uuid && map.socketId === socketId));
      if (index2 > -1){
        this.mappings.splice(index2, 1);
      }
      return true;
    }
    return false;
  }

  @SubscribeMessage('createFlight')
  async create(@MessageBody() createFlightDto: CreateFlightDto, @ConnectedSocket() client: Socket) {
    try {
      await this.trackingService.create(createFlightDto);
      const index = this.mappings.findIndex((map) => map.socketId = client.id)
      if (index > -1) {
        this.mappings[index] = { ...this.mappings[index], flightNo: createFlightDto.flightNumber };
      }
      client.emit('createFlight', { success: true, message: 'success' });
    } catch (error) {
      client.emit('createFlight', { success: false, message: error.message });
    }
  }

  @SubscribeMessage('trackingData')
  onTrackingData(@MessageBody() data: IPositionReport, @ConnectedSocket() client: Socket) {
    try {
      this.trackingService.onTrackingData(data);
      client.emit('trackingData', {success: true});
    } catch (error) {
      client.emit('trackingData', {error: 'Not Found', success: false});
    }
  }

  @SubscribeMessage('reconnectAcars')
  test(@MessageBody() uuid: string, @ConnectedSocket() client: Socket) {
    const reconnected = this._onSocketReconnect(uuid, client.id);
    client.emit('reconnectAcars', reconnected);
  }
}

interface socketFlightMapping {
  flightNo?: string;
  socketId: string;
  socketUUID: string;
  timeOut?: NodeJS.Timeout;
}
