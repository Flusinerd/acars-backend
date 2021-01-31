import { Controller, Get } from '@nestjs/common';
import { Flight } from './dto/flight.dto';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private _trackingService: TrackingService) {}

  @Get('flights')
  getFlights(): Flight[] {
    return this._trackingService.activeFlights;
  }
}
