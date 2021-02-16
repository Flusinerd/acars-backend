import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Repository } from 'typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import * as fs from 'fs';
import { ScheduleCSVLine } from './interfaces/schedule.csv';
import { CreateScheduleDto } from './interfaces/createSchedule';
import { DayOfWeek } from './interfaces/dayOfWeek.enum';
import { updateScheduleDto } from './entities/updateSchedule.dto';
const csv = require('csv-parser')

@Injectable()
export class SchedulesService {

  path = join(__dirname, '..', '..', '..', 'schedules.csv');

  constructor(
    @InjectRepository(ScheduleEntity)
    private _repo: Repository<ScheduleEntity>
  ) {
    this._checkCSV();
  }

  getSchedule(flightNumber: string): Promise<ScheduleEntity> {
    return this._repo.findOne(flightNumber);
  }

  getSchedules(take = 20, skip = 0){
    return this._repo.find({take, skip});
  }

  getCount() {
    return this._repo.count();
  }

  async updateSchedule(flightNumber: string, data: updateScheduleDto) {
    const exists = (await this.getSchedule(flightNumber))
    if (!exists) {
      throw new NotFoundException()
    }
    const update = {...data, flightNumber}
    const duration  = this._calculateDuration(data.depTime, data.arrTime);
    const updateWithDuration = {...update, duration}
    updateWithDuration.flightNumber = updateWithDuration.flightNumber;
    updateWithDuration.originIcao = updateWithDuration.originIcao.toUpperCase();
    updateWithDuration.destinationIcao = updateWithDuration.destinationIcao.toUpperCase();
    console.table(updateWithDuration);
    return this._repo.save(updateWithDuration);
  }

  createSchedule(scheduleData: CreateScheduleDto) {
    let callsign = scheduleData.callsign || scheduleData.flightNumber;
    const schedule = this._repo.create({
      ...scheduleData,
      originIcao: scheduleData.originIcao.toLowerCase(),
      destinationIcao: scheduleData.destinationIcao.toLowerCase(),
      depTime: scheduleData.depTime,
      arrTime: scheduleData.arrTime,
      duration: this._calculateDuration(scheduleData.depTime, scheduleData.arrTime),
      callsign,
      flightNumber: scheduleData.flightNumber || null,
    })
    return this._repo.save(schedule);
  }

  private _calculateDuration(depature: string, arrival: string){
    const depTime = this._parseTime(depature);
    const arrTime = this._parseTime(arrival);
    const duration = new Date(arrTime.valueOf() - depTime.valueOf());
    return this._dateToTimeString(duration);
  }

  private _dateToTimeString(date: Date){
    return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
  }

  private _parseTime(timeString: string): Date {
    const splits = timeString.split(':');
    const date = new Date(0);
    date.setUTCHours(+splits[0]);
    date.setUTCMinutes(+splits[1]);
    date.setUTCSeconds(+splits[2]);
    return date;
  }

  private _parseDayOfWeek(dayOfWeek: string): DayOfWeek {
    return DayOfWeek[dayOfWeek];
  }

  private _checkCSV() {
    if (!fs.existsSync(this.path)) {
      return;
    }

    const results: ScheduleCSVLine[] = [];

    // File exists go through each line and parse the stuff
    fs.createReadStream(this.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const line of results) {
          const parsed: CreateScheduleDto = {
            arrTime: line.arr_time,
            dayOfWeek: this._parseDayOfWeek(line.day),
            depTime: line.dep_time,
            destinationIcao: line.arr_icao.toLowerCase(),
            originIcao: line.dep_icao.toLowerCase(),
            typeCode: line.aircraft,
            flightNumber: 'MQT'+line.flight_number,
          }
          const exists = !!(await this.getSchedule(line.flight_number));
          if (!exists) {
            this.createSchedule(parsed);
          }
        }
      });
  }

}
