import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { FinishedFlightsService } from './finished-flights.service';
import { CreateFinishedFlightDto } from './dto/create-finished-flight.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('finished-flights')
export class FinishedFlightsController {
  constructor(private readonly finishedFlightsService: FinishedFlightsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFinishedFlightDto: CreateFinishedFlightDto) {
    return this.finishedFlightsService.create(createFinishedFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finishedFlightsService.remove(+id);
  }
}
