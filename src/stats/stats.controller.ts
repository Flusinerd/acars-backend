import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('')
  async getStats() {
    const pilotCount = await this.statsService.getTotalPilots();
    const totalFlights = await this.statsService.getTotalFlights();
    const totalDurationAndDistance = await this.statsService.getTotalFlightHours();
    return {
      pilotCount,
      totalFlights,
      ...totalDurationAndDistance
    }
  }
}
