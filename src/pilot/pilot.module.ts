import { Module } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PilotEntity } from './dto/pilot.entity';

@Module({
  controllers: [PilotController],
  providers: [PilotService],
  imports: [TypeOrmModule.forFeature([PilotEntity])]
})
export class PilotModule {}
