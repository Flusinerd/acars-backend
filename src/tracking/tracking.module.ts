import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingGateway } from './tracking.gateway';
import { TrackingController } from './tracking.controller';
import { PlanesModule } from 'src/planes/planes.module';

@Module({
  providers: [TrackingGateway, TrackingService],
  controllers: [TrackingController],
  imports: [PlanesModule],
  exports: [TrackingService]
})
export class TrackingModule {}
