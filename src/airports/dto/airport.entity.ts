import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryColumn } from "typeorm";
import { AirportType } from "./airportType.enum";

@Entity({ name: 'airports' })
export class AirportEntity {
  @ApiProperty()
  @PrimaryColumn({type: 'varchar', 'length': 4})
  ident: string;

  @ApiProperty()
  @Column({nullable: true, enum: AirportType})
  type: AirportType;

  @ApiProperty()
  @Column()
  name: string;
  
  @ApiProperty({})
  @Column( { type: 'decimal',  precision: 10, scale: 6} )
  latitude_deg: number;
  
  @ApiProperty({})
  @Column( { type: 'decimal', precision: 11, scale: 6} )
  longitude_deg: number;

  @ApiProperty()
  @Column({nullable: true})
  elevation_ft: number;

  @ApiProperty()
  @Column({nullable: true})
  continent: string;

  @ApiProperty()
  @Column({nullable: true})
  iso_country: string;

  @ApiProperty()
  @Column({nullable: true})
  iso_region: string;

  @ApiProperty()
  @Column({nullable: true})
  municipality: string;

  @ApiProperty()
  @Column({nullable: true})
  scheduled_service: string;

  @ApiProperty()
  @Column({nullable: true})
  gps_code: string;

  @ApiProperty()
  @Column({nullable: true})
  iata_code: string;

  @ApiProperty()
  @Column({nullable: true})
  local_code: string;

  @ApiProperty()
  @Column({nullable: true})
  home_link: string;

  @ApiProperty()
  @Column({nullable: true})
  wikipedia_link: string;

  @ApiProperty()
  @Column({nullable: true})
  keywords: string;

  @BeforeInsert()
  @BeforeUpdate()
  icaoToUpperCase() {
    this.ident = this.ident.toUpperCase();
  }


}