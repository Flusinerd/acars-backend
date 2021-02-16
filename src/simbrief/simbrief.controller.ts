import { Controller, Get, HttpService, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SimbriefService } from './simbrief.service';

@Controller('simbrief')
export class SimbriefController {
  constructor(
    private readonly simbriefService: SimbriefService,
    private readonly http: HttpService
  ) { }

  @Get('pdf')
  async getPdf(@Query('url') url, @Res() response: Response) {
    const res = (await this.http.get(url, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf' } }).toPromise());
    const data = res.data as ArrayBuffer
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Length': data.byteLength,
    })

    response.send(data);
  }
}
