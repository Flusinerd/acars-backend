import { Module } from '@nestjs/common';
import { FinishedFlightsService } from './finished-flights.service';
import { FinishedFlightsController } from './finished-flights.controller';

@Module({
  controllers: [FinishedFlightsController],
  providers: [FinishedFlightsService]
})
export class FinishedFlightsModule {}
