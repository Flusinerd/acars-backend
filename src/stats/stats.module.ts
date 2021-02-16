import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { PilotModule } from 'src/pilot/pilot.module';
import { FinishedFlightsModule } from 'src/finished-flights/finished-flights.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [PilotModule, FinishedFlightsModule]
})
export class StatsModule {}
