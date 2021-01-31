import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { PilotEntity } from './dto/pilot.entity';
import { UpdatePilotDto } from './dto/update-pilot.dto';

@Injectable()
export class PilotService {

  constructor(
    @InjectRepository(PilotEntity)
    private readonly _pilotRepo: Repository<PilotEntity>
  ) {}

  create(createPilotDto: CreatePilotDto): Promise<PilotEntity> {
    return this._pilotRepo.save(createPilotDto);
  }

  findAll(take = 20, skip = 0) {
    return this._pilotRepo.find({take, skip});
  }

  findOne(id: number) {
    return this._pilotRepo.findOne(id);
  }

  async update(id: number, updatePilotDto: UpdatePilotDto) {
    const pilot = await this.findOne(id);
    if (!pilot){
      throw new NotFoundException()
    }

    const updatedPilot = {...pilot, ...updatePilotDto};
    this._pilotRepo.save(updatePilotDto);
  }

  remove(id: number) {
    return `This action removes a #${id} pilot`;
  }
}
