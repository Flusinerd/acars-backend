import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportEntity } from './dto/airport.entity';
import { AirportType } from './dto/airportType.enum';

@Injectable()
export class AirportsService {

  constructor(
    @InjectRepository(AirportEntity)
    private readonly _airportRepo: Repository<AirportEntity>
  ) { }

  async getAirport(icao: string): Promise<AirportEntity> {
    const airport = await this._airportRepo.findOne(icao.toUpperCase());
    if (!airport) {
      throw new NotFoundException()
    }
    return airport;
  }

  async getAirports(take = 100, skip = 0): Promise<AirportEntity[]> {
    return this._airportRepo.find({ take, skip });
  }

  async getAirportType(type: AirportType, take = 100, skip = 0): Promise<AirportEntity[]> {
    return this._airportRepo.find({ take, skip, where: { type } });
  }

  async getAirportTypeCount(type: AirportType): Promise<number> {
    return this._airportRepo.count({ where: { type } });
  }

}
