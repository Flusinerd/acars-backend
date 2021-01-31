import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/helpers/pagination.class';
import { AirportsService } from './airports.service';
import { AirportEntity } from './dto/airport.entity';

@Controller('airports')
@ApiTags('Airports')
export class AirportsController {
  constructor(private readonly _airportsService: AirportsService) {}

  @Get(':icao')
  @ApiOkResponse({
    type: AirportEntity
  })
  @ApiNotFoundResponse()
  async getAirport(@Param('icao') icao: string): Promise<AirportEntity> {
    return this._airportsService.getAirport(icao);
  }

  @Get()
  @ApiOkResponse({
    type: [AirportEntity]
  })
  async getAirports(@Query() pagination: PaginationParams): Promise<AirportEntity[]> {
    return this._airportsService.getAirports(pagination.take, pagination.skip);
  }

}
