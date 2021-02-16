import { PilotEntity } from "src/pilot/dto/pilot.entity";
import { PlaneTypeEntity } from "src/planes/dto/plane.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'finishedFlights' })
export class FinishedFlight {
  @PrimaryGeneratedColumn('uuid')
  flightId: string;

  @Column()
  depatureIcao: string;

  @Column()
  arrivalIcao: string;

  @Column()
  duration: number;

  @Column()
  distance: number;

  @Column()
  pax: number;

  @Column()
  cargo: number;

  @Column()
  route: string;

  @Column()
  planeName: string;

  @Column({ type: 'timestamp' })
  depatureTime: Date;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Column({ type: 'timestamp' })
  pirepTime: Date;

  @Column()
  landingRate: number;

  @Column()
  comment: string;

  @Column()
  pilotPay: number;

  @ManyToOne(() => PilotEntity)
  @JoinColumn({name: 'pilotId'})
  pilot: PilotEntity;

  @Column()
  pilotId: number;

  @ManyToOne(() => PlaneTypeEntity)
  @JoinColumn({ name: 'planeTypeCode' })
  planeType: PlaneTypeEntity;

  @Column()
  planeTypeCode: string;

  @BeforeInsert()
  @BeforeUpdate()
  icaoToUpperCase() {
    this.arrivalIcao = this.arrivalIcao.toUpperCase();
    this.depatureIcao = this.depatureIcao.toUpperCase();
  }
}
