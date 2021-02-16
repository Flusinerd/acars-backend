import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { PilotService } from 'src/pilot/pilot.service';
import { TrackingService } from 'src/tracking/tracking.service';
import { Repository } from 'typeorm';
import { CreateFinishedFlightDto } from './dto/create-finished-flight.dto';
import { UpdateFinishedFlightDto } from './dto/update-finished-flight.dto';
import { FinishedFlight } from './entities/finished-flight.entity';

@Injectable()
export class FinishedFlightsService {

  pointsPerSecond = 55 / (60 * 60);

  constructor(
    @InjectRepository(FinishedFlight)
    public finishedFlightRepo: Repository<FinishedFlight>,

    @Inject(REQUEST) private readonly request: Request,
    private pilotService: PilotService,
    private tracking: TrackingService
  ) { }

  async create(createFinishedFlightDto: CreateFinishedFlightDto) {

    const duration = Math.floor((new Date(createFinishedFlightDto.arrivalTime).valueOf() - new Date(createFinishedFlightDto.depatureTime).valueOf()) / 1000);
    const finishedFlight = this.finishedFlightRepo.create({
      ...createFinishedFlightDto,
      duration,
      pirepTime: new Date(),
      pilotPay: Math.round(duration * this.pointsPerSecond),
      pilotId: this.request.user.pilotId
    });

    const pirep = await this.finishedFlightRepo.save(finishedFlight);
    await this.pilotService.awardPointsForFlight(
      this.request.user.pilotId,
      duration,
      createFinishedFlightDto.distance,
      createFinishedFlightDto.arrivalIcao,
      createFinishedFlightDto.pax,
      createFinishedFlightDto.cargo
    );

    this.tracking.remove(createFinishedFlightDto.flightNumber);
    return pirep;
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
