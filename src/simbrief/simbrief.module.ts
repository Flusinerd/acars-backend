import { HttpModule, Module } from '@nestjs/common';
import { SimbriefService } from './simbrief.service';
import { SimbriefController } from './simbrief.controller';

@Module({
  controllers: [SimbriefController],
  providers: [SimbriefService],
  imports: [HttpModule]
})
export class SimbriefModule {}
