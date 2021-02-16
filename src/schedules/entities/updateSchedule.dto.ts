import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { DayOfWeek } from "../interfaces/dayOfWeek.enum";

export class updateScheduleDto  {
  @ApiPropertyOptional()
  callsign?: string;

  @ApiProperty()
  originIcao: string;

  @ApiProperty()
  destinationIcao: string

  @ApiProperty()
  depTime: string

  @ApiProperty()
  arrTime: string

  @ApiProperty()
  typeCode: string

  @ApiProperty({enum: DayOfWeek})
  dayOfWeek: DayOfWeek
}