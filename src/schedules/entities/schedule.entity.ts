import { AirportEntity } from "src/airports/dto/airport.entity";
import { PlaneTypeEntity } from "src/planes/dto/plane.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DayOfWeek } from "../interfaces/dayOfWeek.enum";

@Entity({ name: 'schedules' })
export class ScheduleEntity {
  @PrimaryColumn()
  flightNumber: string;

  @Column()
  callsign: string;

  @ManyToOne(() => AirportEntity)
  @JoinColumn({name: 'originIcao'})
  originAirport: AirportEntity;

  @Column({})
  originIcao: string;

  @ManyToOne(() => AirportEntity)
  @JoinColumn({name: 'destinationIcao'})
  destinationAirport: AirportEntity;

  @Column()
  destinationIcao: string;

  @Column({ type: 'time without time zone' })
  depTime: Date

  @Column({ type: 'time without time zone' })
  arrTime: Date

  @Column({ type: 'time without time zone' })
  duration: Date

  @ManyToOne(() => PlaneTypeEntity)
  @JoinColumn({ name: 'typeCode' })
  planeType: PlaneTypeEntity

  @Column()
  typeCode: string;

  @Column({type: 'enum', enum: DayOfWeek, default: DayOfWeek.Mo})
  dayOfWeek: DayOfWeek;

  @BeforeInsert()
  @BeforeUpdate()
  icaoToUpperCase() {
    this.destinationIcao = this.destinationIcao.toUpperCase();
    this.originIcao = this.originIcao.toUpperCase();
  }
}