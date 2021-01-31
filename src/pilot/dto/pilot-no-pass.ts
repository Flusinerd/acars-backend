import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PilotEntity } from "./pilot.entity";

export class PilotWithoutPassword extends PartialType(PilotEntity) {
  @ApiProperty()
  currentLocation: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  flightHours: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  pilotId: number;

  @ApiProperty()
  totalDistance: number;

  @ApiProperty()
  totalFlights: number;

  @ApiProperty()
  totalPax: number;

  constructor(pilot: PilotEntity) {
    super();
    const {password, ...noPass} = pilot;
    Object.assign(this, noPass);
  }
}