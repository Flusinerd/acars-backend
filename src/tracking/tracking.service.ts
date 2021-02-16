import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { PlanesService } from 'src/planes/planes.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { Flight } from './dto/flight.dto';
import { IPositionReport } from './dto/posRep.dto';

@Injectable()
export class TrackingService {

  constructor(
    private planesService: PlanesService
  ) {}

  private _logger = new Logger('Tracking Service')

  activeFlights: Flight[] = [];
  flightRemoveEvent = new Subject<string>();

  create(flightData: CreateFlightDto): CreateFlightDto {
    if (this.findFlight(flightData.flightNumber)) {
      throw new ConflictException();
    }

    this.activeFlights.push({
      positions: [{
        lat: flightData.lat,
        long: flightData.long
      }],
      ...flightData
    })
    this._logger.verbose('Registered flight', flightData.flightNumber);
    return flightData;
  }

  remove(flightNo: string) {
    this.activeFlights = this.activeFlights.filter((candidate) => !(candidate.flightNumber === flightNo));
    this.flightRemoveEvent.next(flightNo);
  }

  onTrackingData(trackingData: IPositionReport): IPositionReport {
    const flight = this.findFlight(trackingData.flightNumber);
    if (flight) {
      flight.gs = trackingData.gs;
      flight.positions.push({
        lat: trackingData.lat,
        long: trackingData.long,
      });
      flight.heading = trackingData.heading;
      flight.altitude = trackingData.altitude;
      this._logger.verbose('Updated flight', trackingData.flightNumber);
      return trackingData
    } else {
      throw new NotFoundException();
    }
  }

  findFlight(flightNumber: string): Flight {
    return this.activeFlights.find((candidate) => candidate.flightNumber === flightNumber);
  }
}
