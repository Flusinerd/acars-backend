import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { PilotWithoutPassword } from './dto/pilot-no-pass';
import { PaginationParams } from 'src/helpers/pagination.class';

@Controller('pilots')
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Post()
  async create(@Body() createPilotDto: CreatePilotDto) {
    return new PilotWithoutPassword(await this.pilotService.create(createPilotDto));
  }

  @Get()
  async findAll(@Query() pagination: PaginationParams) {
    return (await this.pilotService.findAll(pagination.take, pagination.skip)).map((pilot) => new PilotWithoutPassword(pilot));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new PilotWithoutPassword(await this.pilotService.findOne(+id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePilotDto: UpdatePilotDto) {
    return this.pilotService.update(+id, updatePilotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pilotService.remove(+id);
  }
}
