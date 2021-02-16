import { PilotEntity } from "src/pilot/dto/pilot.entity";
import { Pilot } from "src/pilot/entities/pilot.entity";
import { PlaneTypeEntity } from "src/planes/dto/plane.entity";

export class CreateFinishedFlightDto {
  flightNumber: string;
  depatureIcao: string;
  arrivalIcao: string;
  distance: number;
  pax: number;
  cargo: number;
  route: string;
  planeName: string;
  depatureTime: Date;
  arrivalTime: Date;
  landingRate: number;
  comment: string;
  planeTypeCode: string;
}

/** Set in Backend:
 * duration
 * pirepTime
 * pilotPay
 * 
 */