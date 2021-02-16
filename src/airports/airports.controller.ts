import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/helpers/pagination.class';
import { AirportsService } from './airports.service';
import { AirportEntity } from './dto/airport.entity';
import { AirportType } from './dto/airportType.enum';

@Controller('airports')
@ApiTags('Airports')
export class AirportsController {
  constructor(private readonly _airportsService: AirportsService) {}

  @Get('/major')
  @ApiOkResponse({
    type: [AirportEntity]
  })
  @ApiNotFoundResponse()
  async getMajorAirports(@Query() pagination: PaginationParams): Promise<AirportEntity[]> {
    return this._airportsService.getAirportType(AirportType.LARGE, pagination.take, pagination.skip);
  }

  @Get('/major/count')
  async getCountMajorAirports() {
    return this._airportsService.getAirportTypeCount(AirportType.LARGE);
  }

  @Get('/medium')
  @ApiOkResponse({
    type: [AirportEntity]
  })
  @ApiNotFoundResponse()
  async getMediumAirports(@Query() pagination: PaginationParams): Promise<AirportEntity[]> {
    return this._airportsService.getAirportType(AirportType.MEDIUM, pagination.take, pagination.skip);
  }

  @Get('/medium/count')
  async getCountMediumAirports() {
    return this._airportsService.getAirportTypeCount(AirportType.MEDIUM);
  }

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
