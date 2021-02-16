export interface ScheduleCSVLine {
  flight_number: string;
  dep_icao: string;
  dep_city: string;
  arr_icao: string;
  arr_city: string;
  dep_time: string;
  arr_time: string;
  duration: string;
  day: string;
  aircraft: string;
  aircraft_reg: string;
  route: string;
  comments: string;
  operator: string;
}