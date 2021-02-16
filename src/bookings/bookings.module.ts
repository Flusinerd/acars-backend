import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  exports: [BookingsService]
})
export class BookingsModule {}
