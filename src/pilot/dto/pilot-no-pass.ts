import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PilotEntity } from "./pilot.entity";
import { IPilotWithoutPass } from './pilot-no-pass.interface';

export class PilotWithoutPassword extends PartialType(PilotEntity) implements IPilotWithoutPass {
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
    if (pilot) {
      const {password, ...noPass} = pilot;
      Object.assign(this, noPass);
    }
  }
}