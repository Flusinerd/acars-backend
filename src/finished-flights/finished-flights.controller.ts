import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FinishedFlightsService } from './finished-flights.service';
import { CreateFinishedFlightDto } from './dto/create-finished-flight.dto';
import { UpdateFinishedFlightDto } from './dto/update-finished-flight.dto';

@Controller('finished-flights')
export class FinishedFlightsController {
  constructor(private readonly finishedFlightsService: FinishedFlightsService) {}

  @Post()
  create(@Body() createFinishedFlightDto: CreateFinishedFlightDto) {
    return this.finishedFlightsService.create(createFinishedFlightDto);
  }

  @Get()
  findAll() {
    return this.finishedFlightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finishedFlightsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFinishedFlightDto: UpdateFinishedFlightDto) {
    return this.finishedFlightsService.update(+id, updateFinishedFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finishedFlightsService.remove(+id);
  }
}
