import { Controller, Get, Post, Body, Put, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { PaginationParams } from 'src/helpers/pagination.class';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlaneTypeEntity } from './dto/plane.entity';

@Controller('planes')
@ApiTags('Planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Post('types')
  @ApiCreatedResponse({type: PlaneTypeEntity})
  @ApiConflictResponse()
  @ApiInternalServerErrorResponse()
  create(@Body() createPlaneDto: CreatePlaneDto) {
    return this.planesService.create(createPlaneDto);
  }

  @Get('types')
  @ApiOkResponse({type: [PlaneTypeEntity]})
  @ApiInternalServerErrorResponse()
  findAll(@Query() pagination: PaginationParams) {
    return this.planesService.findAll(pagination.take, pagination.skip);
  }

  @Get('types/:typeCode')
  @ApiOkResponse({type: PlaneTypeEntity})
  @ApiInternalServerErrorResponse()
  async findOne(@Param('typeCode') typeCode: string) {
    const result = await this.planesService.findOne(typeCode);
    if (!result) {
      throw new NotFoundException()
    }
    return result;
  }

  @Get('types/atc/:atcCode')
  @ApiOkResponse({type: PlaneTypeEntity})
  @ApiInternalServerErrorResponse()
  async findOneByAtcCode(@Param('atcCode') typeCode: string) {
    const result = await this.planesService.findOneByAtc(typeCode);
    if (!result) {
      await this.planesService.createUnknownType(typeCode);
      throw new NotFoundException()
    }
    return result;
  }


  @Put('types/:typeCode')
  @ApiOkResponse({type: PlaneTypeEntity})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  update(@Param('typeCode') typeCode: string, @Body() updatePlaneDto: UpdatePlaneDto) {
    return this.planesService.update(typeCode, updatePlaneDto);
  }

  @Delete('types/:typeCode')
  remove(@Param('typeCode') typeCode: string) {
    return this.planesService.remove(typeCode);
  }
}
