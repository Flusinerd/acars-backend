import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PilotEntity } from "src/pilot/dto/pilot.entity";
import { ScheduleEntity } from "src/schedules/entities/schedule.entity";

export class CreateBookingDto {
  @ApiProperty()
  scheduleFlightNumber: string;
  @ApiProperty()
  simbriefOfp: string;
}