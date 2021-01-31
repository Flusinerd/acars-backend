import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AtcTypeCodeEntity } from "./atcTypeCode.entity";

@Entity({ name: 'planeTypes' })
export class PlaneTypeEntity {
  @PrimaryColumn()
  @ApiProperty()
  typeCode: string;

  @Column()
  @ApiProperty()
  description: string;

  @OneToMany(() => AtcTypeCodeEntity, (atcTypeCode) => atcTypeCode.plane, {eager: true, cascade: true})
  @ApiProperty({type: [AtcTypeCodeEntity]})
  atcTypeCodes: AtcTypeCodeEntity[];
}