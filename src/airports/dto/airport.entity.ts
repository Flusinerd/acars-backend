import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'airports' })
export class AirportEntity {
  @ApiProperty({readOnly: true})
  @PrimaryColumn()
  icao: string;
  
  @ApiProperty({readOnly: true})
  @Column( { type: 'decimal',  precision: 10, scale: 6} )
  lat: number;
  
  @ApiProperty({readOnly: true})
  @Column( { type: 'decimal', precision: 11, scale: 6} )
  long: number;
}