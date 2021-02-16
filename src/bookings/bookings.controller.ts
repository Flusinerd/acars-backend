import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/createBooking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createBooking(@Body() data: CreateBookingDto) {
    return this.bookingsService.createBooking(data);
  }

  @Get(':id')
  getBooking(@Param('id') bookingId: string) {
    return this.bookingsService.getBooking(bookingId);
  }

  @Delete(':id')
  deleteBooking(@Param('id') bookingId: string) {
    return this.bookingsService.deleteBooking(bookingId);
  }
}
