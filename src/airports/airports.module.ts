import { Module } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { AirportsController } from './airports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportEntity } from './dto/airport.entity';

@Module({
  controllers: [AirportsController],
  providers: [AirportsService],
  imports: [TypeOrmModule.forFeature([AirportEntity])]
})
export class AirportsModule {}
