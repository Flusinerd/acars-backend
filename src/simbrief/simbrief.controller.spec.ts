import { Test, TestingModule } from '@nestjs/testing';
import { SimbriefController } from './simbrief.controller';
import { SimbriefService } from './simbrief.service';

describe('SimbriefController', () => {
  let controller: SimbriefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimbriefController],
      providers: [SimbriefService],
    }).compile();

    controller = module.get<SimbriefController>(SimbriefController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
