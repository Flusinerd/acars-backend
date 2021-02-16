import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
  imports: [TypeOrmModule.forFeature([ScheduleEntity])]
})
export class SchedulesModule {}
