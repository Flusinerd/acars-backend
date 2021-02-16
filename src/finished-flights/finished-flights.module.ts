import { Module } from '@nestjs/common';
import { FinishedFlightsService } from './finished-flights.service';
import { FinishedFlightsController } from './finished-flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedFlight } from './entities/finished-flight.entity';
import { PilotModule } from 'src/pilot/pilot.module';
import { TrackingModule } from 'src/tracking/tracking.module';

@Module({
  controllers: [FinishedFlightsController],
  providers: [FinishedFlightsService],
  imports: [TypeOrmModule.forFeature([FinishedFlight]), PilotModule, TrackingModule],
  exports: [FinishedFlightsService]
})
export class FinishedFlightsModule {}
