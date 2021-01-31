import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  //#region Stats
  @Column({ default: 0 })
  flightHours: number;

  @Column({ default: 'eddl' })
  currentLocation: string;

  @Column({ default: 0 })
  totalFlights: number;

  @Column({ default: 0 })
  totalPax: number;

  @Column({ default: 0 })
  totalDistance: number;
  //#endregion Stats
}