import { IPositionReport } from "./posRep.dto";

export class Flight {
  positions: IPosition[] = [];
  flightNumber: string;
  gs: number;
  heading: number;
  altitude: number;
  depatureIcao: string;
  arrivalIcao: string;
  isScheduled = false;
}

export interface IPosition {
  lat: number,
  long: number,
}