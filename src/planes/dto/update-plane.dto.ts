import { PartialType } from '@nestjs/mapped-types';
import { AtcTypeCodeEntity } from './atcTypeCode.entity';
import { CreatePlaneDto } from './create-plane.dto';

export class UpdatePlaneDto extends PartialType(CreatePlaneDto) {
  atcTypeCodes: AtcTypeCodeEntity[];
  description: string;
}
