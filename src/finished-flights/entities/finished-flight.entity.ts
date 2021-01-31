import { PilotEntity } from "src/pilot/dto/pilot.entity";
import { Pilot } from "src/pilot/entities/pilot.entity";
import { PlaneTypeEntity } from "src/planes/dto/plane.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
