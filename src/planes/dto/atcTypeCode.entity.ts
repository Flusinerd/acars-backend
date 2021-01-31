import { ApiProperty } from "@nestjs/swagger";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { PlaneTypeEntity } from "./plane.entity";

@Entity({ name: 'atcTypeCodes' })
export class AtcTypeCodeEntity {
  @PrimaryColumn()
  @ApiProperty()
  atcTypeCode: string;

  @ManyToOne(() => PlaneTypeEntity, (plane) => plane.atcTypeCodes)
  plane?: PlaneTypeEntity;
}