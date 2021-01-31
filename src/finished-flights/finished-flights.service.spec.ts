import { Test, TestingModule } from '@nestjs/testing';
import { FinishedFlightsService } from './finished-flights.service';

describe('FinishedFlightsService', () => {
  let service: FinishedFlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinishedFlightsService],
    }).compile();

    service = module.get<FinishedFlightsService>(FinishedFlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
