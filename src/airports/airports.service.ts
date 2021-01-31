import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportEntity } from './dto/airport.entity';

@Injectable()
export class AirportsService {

  constructor(
    @InjectRepository(AirportEntity)
    private readonly _airportRepo: Repository<AirportEntity>
  ) {}

  async getAirport(icao: string): Promise<AirportEntity> {
    const airport = await this._airportRepo.findOne(icao.toLowerCase());
    if (!airport) {
      throw new NotFoundException()
    }
    return airport;
  }

  async getAirports(take = 100, skip = 0): Promise<AirportEntity[]> {
    return this._airportRepo.find({take, skip});
  }

}
