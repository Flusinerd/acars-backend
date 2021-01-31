import { Test, TestingModule } from '@nestjs/testing';
import { FinishedFlightsController } from './finished-flights.controller';
import { FinishedFlightsService } from './finished-flights.service';

describe('FinishedFlightsController', () => {
  let controller: FinishedFlightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinishedFlightsController],
      providers: [FinishedFlightsService],
    }).compile();

    controller = module.get<FinishedFlightsController>(FinishedFlightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
