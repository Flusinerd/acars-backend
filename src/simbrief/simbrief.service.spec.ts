import { Test, TestingModule } from '@nestjs/testing';
import { SimbriefService } from './simbrief.service';

describe('SimbriefService', () => {
  let service: SimbriefService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimbriefService],
    }).compile();

    service = module.get<SimbriefService>(SimbriefService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
