import { PlaneTypeEntity } from "src/planes/dto/plane.entity";

export class CreateFlightDto {
  lat: number;
  long: number;
  flightNumber: string;
  gs: number;
  heading: number;
  altitude: number;
  depatureIcao: string;
  arrivalIcao: string;
  isScheduled: boolean;
  planeType: PlaneTypeEntity | string;
}
