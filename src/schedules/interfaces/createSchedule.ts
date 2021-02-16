import { DayOfWeek } from "./dayOfWeek.enum";

export class CreateScheduleDto {
  flightNumber?: string;
  callsign?: string;
  originIcao: string;
  destinationIcao: string;
  depTime: string;
  arrTime: string;
  typeCode: string;
  dayOfWeek: DayOfWeek;
}