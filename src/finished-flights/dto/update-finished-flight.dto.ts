import { PartialType } from '@nestjs/mapped-types';
import { CreateFinishedFlightDto } from './create-finished-flight.dto';

export class UpdateFinishedFlightDto extends PartialType(CreateFinishedFlightDto) {}
