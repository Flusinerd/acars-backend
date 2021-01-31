import { Injectable } from '@nestjs/common';
import { CreateFinishedFlightDto } from './dto/create-finished-flight.dto';
import { UpdateFinishedFlightDto } from './dto/update-finished-flight.dto';

@Injectable()
export class FinishedFlightsService {
  create(createFinishedFlightDto: CreateFinishedFlightDto) {
    return 'This action adds a new finishedFlight';
  }

  findAll() {
    return `This action returns all finishedFlights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} finishedFlight`;
  }

  update(id: number, updateFinishedFlightDto: UpdateFinishedFlightDto) {
    return `This action updates a #${id} finishedFlight`;
  }

  remove(id: number) {
    return `This action removes a #${id} finishedFlight`;
  }
}
