import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { PlaneTypeEntity } from './dto/plane.entity';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import * as jsonPlanes from 'planes.json'
import { UnknownPlaneEntity } from './dto/unkown-plane.entity';
import { AtcTypeCodeEntity } from './dto/atcTypeCode.entity';


@Injectable()
export class PlanesService {

  private logger =  new Logger('PlanesService')

  constructor(
    @InjectRepository(PlaneTypeEntity)
    private planeRepo: Repository<PlaneTypeEntity>,
    @InjectRepository(UnknownPlaneEntity)
    private unknownPlanesRepo: Repository<UnknownPlaneEntity>,
    @InjectRepository(AtcTypeCodeEntity)
    private atcTypeCodeRepo: Repository<AtcTypeCodeEntity>,
  ) {
    this.checkJson();
  }

  async create(createPlaneDto: CreatePlaneDto) {
    const exists = await this.findOne(createPlaneDto.typeCode);
    if (exists) {
      throw new ConflictException
    }

    const newPlane = this.planeRepo.create(createPlaneDto);
    return this.planeRepo.save(newPlane);
  }

  findAll(take = 20, skip = 0) {
    return this.planeRepo.find({take, skip});
  }

  findOne(typeCode: string) {
    return this.planeRepo.findOne(typeCode);
  }

  findOneByAtc(atcTypeCode: string){
    return this.atcTypeCodeRepo.findOne({where: {atcTypeCode}, relations: ['plane', 'plane.atcTypeCodes']});
  }

  async update(typeCode: string, updatePlaneDto: UpdatePlaneDto) {
    const exists = await this.findOne(typeCode);
    if(!exists) {
      throw new NotFoundException()
    }
    const updated = {...exists, ...updatePlaneDto};
    return this.planeRepo.save(updated);
  }

  remove(typeCode: string) {
    return this.planeRepo.delete({typeCode});
  }

  private async getMissingPlanes(): Promise<JsonPlane[]> {
    const missingPlanes: JsonPlane[] = [];
    for (const plane of jsonPlanes) {
      const exists = await this.findOne(plane.type)
      if (!exists) {
        missingPlanes.push(plane);
      }
    }
    return missingPlanes;
  }

  private async checkJson() {
    const missingPlanes = await this.getMissingPlanes();
    for (const missingPlane of missingPlanes) {
      await this.create({
        atcTypeCodes: missingPlane.atcTypeCodes.map((code) => {return {atcTypeCode: code}}),
        description: missingPlane.description,
        typeCode: missingPlane.type
      })
      this.logger.log(`Created Plane entry for: ${missingPlane.description} (${missingPlane.type})`);
    }
  }

  createUnknownType(atcName: string) {
    return this.unknownPlanesRepo.save({atcName});
  }
}


export interface JsonPlane {
  type: string;
  description: string;
  atcTypeCodes: string[];
}