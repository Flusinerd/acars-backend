import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { CreateScheduleDto } from 'src/schedules/interfaces/createSchedule';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/createBooking.dto';
import { BookingEntity } from './entity/booking.entity';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(BookingEntity)
    private _repo: Repository<BookingEntity>,

    @Inject(REQUEST) private request: Request,
  ) {}

  async getBooking(id: string) {
    const booking = await this._repo.findOne({where: {bookingId: id}, relations: ['schedule']});
    if (!booking) {
      throw new NotFoundException()
    }
    return booking;
  }

  async deleteBooking(id: string) {
    this._repo.delete(id);
  }

  createBooking(data: CreateBookingDto) {
    if (!this.request.user!.pilotId) {
      throw new UnauthorizedException();
    }
    return this._repo.save({
      scheduleFlightNumber: data.scheduleFlightNumber,
      simbriefOfp: data.simbriefOfp,
      pilotId: this.request.user.pilotId
    })
  }

  getBookingsOfPilot(pilotId: string) {
    return this._repo.find({where: {pilotId}});
  }
}
