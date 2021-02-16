import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpService, UseGuards, Request } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { PilotWithoutPassword } from './dto/pilot-no-pass';
import { PaginationParams } from 'src/helpers/pagination.class';
import { promises } from 'fs';
import { join } from 'path';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './dto/login.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { BookingsService } from 'src/bookings/bookings.service';

@Controller('pilots')
@ApiTags('Pilots')
export class PilotController {
  constructor(
    private readonly pilotService: PilotService,
    private httpService: HttpService,
    private bookings: BookingsService
  ) { }

  @Post()
  async create(@Body() createPilotDto: CreatePilotDto) {
    return new PilotWithoutPassword(await this.pilotService.create(createPilotDto));
  }

  @Get()
  async findAll(@Query() pagination: PaginationParams) {
    return (await this.pilotService.findAll(pagination.take, pagination.skip)).map((pilot) => new PilotWithoutPassword(pilot));
  }

  @Get('test')
  @ApiOperation({deprecated: true})
  async test(@Query('ofpid') ofpid: string) {
    // const res = (await this.httpService.get(`http://www.simbrief.com/ofp/flightplans/xml/${ofpid}.xml`, { responseType: 'text' }).toPromise()).data;
    // writeFile(join(__dirname, '..', '..', '..', 'ofp.xml'), res, () => {
    // });
    const res = await promises.readFile(join(__dirname, '..', '..', '..', 'ofp.xml'));
    return res.toString();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new PilotWithoutPassword(await this.pilotService.findOne(+id));
  }

  @Get(':id/bookings')
  async findBookings(@Param('id') id: string) {
    return this.bookings.getBookingsOfPilot(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePilotDto: UpdatePilotDto) {
    return this.pilotService.update(+id, updatePilotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pilotService.remove(+id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({type: LoginRequest})
  async login(@Request() req) {
    return this.pilotService.createToken(req.user);
  }
}
