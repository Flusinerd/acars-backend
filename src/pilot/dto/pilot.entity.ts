import { BookingEntity } from "src/bookings/entity/booking.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Rank {
  STUDENT = "Student Pilot",
  PRIVATE_PILOT = "Private Pilot",
  SECOND_OFFICER = "Second Officer",
  JUNIOR_FIRST_OFFICER = "Junior First Officer",
  FIRST_OFFICER = "First Officer",
  SENIOR_FIRST_OFFICER = "Senior First Officer",
  CAPTAIN = "Captain",
  FLIGHT_CAPTAIN = "Flight Captain",
  SENIOR_CAPTAIN = "Senior Captain",
  VA_TRANSPORT_PILOT = "VA Transport Pilot",
}

@Entity({ name: 'pilots' })
export class PilotEntity {
  @PrimaryGeneratedColumn('increment')
  pilotId: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({enum: Rank, type: 'enum', default: Rank.STUDENT})
  rank: Rank

  //#region Stats
  @Column({ default: 0, type: 'float' })
  flightHours: number;

  @Column({ default: 'eddl' })
  currentLocation: string;

  @Column({ default: 0 })
  totalFlights: number;

  @Column({ default: 0 })
  totalPax: number;

  @Column({ default: 0 })
  totalCargo: number;

  @Column({ default: 0 })
  totalDistance: number;
  //#endregion Stats

  @OneToMany(() => BookingEntity, booking => booking.pilot)
  bookings: BookingEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  icaoToUpperCase() {
    this.currentLocation = this.currentLocation.toUpperCase();
  }
}