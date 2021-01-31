import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationParams {
  @ApiPropertyOptional({
    default: 20,
    description: 'Amount of items to return',
  })
  take?: number = 20;

  @ApiPropertyOptional({ default: 0, description: 'Amount of items to skip' })
  skip?: number = 0;
}