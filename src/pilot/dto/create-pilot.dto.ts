import { ApiProperty } from "@nestjs/swagger";

export class CreatePilotDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}
