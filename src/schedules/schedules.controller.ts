import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/helpers/pagination.class';
import { updateScheduleDto } from './entities/updateSchedule.dto';
import { CreateScheduleDto } from './interfaces/createSchedule';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
@ApiTags('Schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) { }

  @Get()
  getAll(@Query() pagination: PaginationParams) {
    return this.schedulesService.getSchedules(pagination.take, pagination.skip);
  }

  @Get('count')
  getCount() {
    return this.schedulesService.getCount();
  }

  @Get(':id/exists')
  async getExists(@Param('id') id: string) {
    try {
      const exists = await this.schedulesService.getSchedule(id); 
      if (exists) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  @Put(':id')
  updateSchedule(@Body() updatedData: updateScheduleDto, @Param('id') flightNumber: string) {
    return this.schedulesService.updateSchedule(flightNumber, updatedData);
  }

  @Post('')
  createSchedule(@Body() data: CreateScheduleDto) {
    return this.schedulesService.createSchedule(data);
  }
}
