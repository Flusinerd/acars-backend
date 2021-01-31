import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaneTypeEntity } from './dto/plane.entity';
import { UnknownPlaneEntity } from './dto/unkown-plane.entity';
import { AtcTypeCodeEntity } from './dto/atcTypeCode.entity';

@Module({
  controllers: [PlanesController],
  providers: [PlanesService],
  imports: [TypeOrmModule.forFeature([PlaneTypeEntity, UnknownPlaneEntity, AtcTypeCodeEntity])],
  exports: [PlanesService]
})
export class PlanesModule {}
