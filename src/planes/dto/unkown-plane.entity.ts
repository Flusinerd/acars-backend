import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'unknownPlaneTypes' })
export class UnknownPlaneEntity {
  @PrimaryColumn()
  @ApiProperty()
  atcName: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date
}