import { Injectable } from '@nestjs/common';
import { FinishedFlightsService } from 'src/finished-flights/finished-flights.service';
import { PilotService } from 'src/pilot/pilot.service';

@Injectable()
export class StatsService {

  constructor(
    private _pilotService: PilotService,
    private _finishedFlightsService: FinishedFlightsService,
  ) {}

  getTotalFlights() {
    return this._finishedFlightsService.finishedFlightRepo.count();
  }

  async getTotalFlightHours() {
    let flightHours = 0;
    let distance = 0;
    const flights = await this._finishedFlightsService.finishedFlightRepo.find();
    for (const flight of flights) {
      flightHours += flight.duration;
      distance += flight.distance;
    }
    return {
      flightHours,
      distance
    };
  }

  async getTotalPilots() {
    return this._pilotService.getCount();
  }

}
