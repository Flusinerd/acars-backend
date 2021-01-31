import { PilotEntity } from "src/pilot/dto/pilot.entity";
import { Pilot } from "src/pilot/entities/pilot.entity";
import { PlaneTypeEntity } from "src/planes/dto/plane.entity";

export class CreateFinishedFlightDto {
  depatureIcao: string;
  arrivalIcao: string;
  duration: number;
  distance: number;
  pax: number;
  cargo: number;
  pilotId: number;
  planeTypeCode: string;
}
