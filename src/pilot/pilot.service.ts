import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { PilotWithoutPassword } from './dto/pilot-no-pass';
import { PilotEntity, Rank } from './dto/pilot.entity';
import { UpdatePilotDto } from './dto/update-pilot.dto';

@Injectable()
export class PilotService {
  constructor(
    @InjectRepository(PilotEntity)
    private readonly _pilotRepo: Repository<PilotEntity>,
    private jwtService: JwtService
  ) {}

  async create(createPilotDto: CreatePilotDto): Promise<PilotEntity> {
    createPilotDto.password = await hash(createPilotDto.password, 10);
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

  async login(email: string, challenge: string): Promise<PilotWithoutPassword | undefined> {
    const pilot = await this._pilotRepo.findOne({where: {email}});
    if (!pilot){
      return null;
    }

    const compareResult = await compare(challenge, pilot.password);
    if (compareResult){
      return new PilotWithoutPassword(pilot);
    }
    return null;
  }

  async createToken(user: PilotWithoutPassword){
    return {
      access_token: this.jwtService.sign(JSON.parse(JSON.stringify(user)))
    };
  }

  async awardPointsForFlight(pilotId: number, duration: number, distance: number, newLocation: string, pax: number, cargo: number) {
    const currentData = await this._pilotRepo.findOne({where: {pilotId}});
    if (!currentData) {
      throw new NotFoundException();
    }
    const durationInHours = duration / 3600;
    currentData.currentLocation = newLocation;
    currentData.flightHours += durationInHours;
    currentData.totalDistance += distance;
    currentData.totalPax += pax;
    currentData.totalCargo += cargo;
    currentData.totalFlights += 1;
    currentData.rank = this._getRankForHours(currentData.flightHours);

    this._pilotRepo.save(currentData);
  }

  private _getRankForHours(hours: number) {
    if(hours >= 1000) {
      return Rank.VA_TRANSPORT_PILOT;
    }
    if(hours >= 700) {
      return Rank.SENIOR_CAPTAIN;
    }
    if(hours >= 450) {
      return Rank.FLIGHT_CAPTAIN;
    }
    if(hours >= 300) {
      return Rank.CAPTAIN;
    }
    if(hours >= 200) {
      return Rank.SENIOR_FIRST_OFFICER;
    }
    if(hours >= 120) {
      return Rank.FIRST_OFFICER;
    }
    if(hours >= 80) {
      return Rank.JUNIOR_FIRST_OFFICER;
    }
    if(hours >= 30) {
      return Rank.SECOND_OFFICER;
    }
    if(hours >= 11) {
      return Rank.PRIVATE_PILOT;
    }
    return Rank.STUDENT;
  }

  getCount() {
    return this._pilotRepo.count();
  }
}


