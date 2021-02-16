import { ApiProperty } from "@nestjs/swagger";
import { PilotEntity } from "src/pilot/dto/pilot.entity";
import { Pilot } from "src/pilot/entities/pilot.entity";
import { ScheduleEntity } from "src/schedules/entities/schedule.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Bookings' })
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({readOnly: true})
  bookingId: string;

  @Column()
  @ApiProperty()
  scheduleFlightNumber: string;

  @ManyToOne(() => ScheduleEntity)
  @ApiProperty()
  @JoinColumn({name: 'scheduleFlightNumber'})
  schedule: ScheduleEntity;

  @Column({nullable: true})
  @ApiProperty()
  simbriefOfp: string;

  @ManyToOne(() => PilotEntity, pilot => pilot.bookings)
  @JoinColumn({ name: 'pilotId' })
  @ApiProperty()
  pilot: PilotEntity;

  @Column()
  @ApiProperty()
  pilotId: number;
}