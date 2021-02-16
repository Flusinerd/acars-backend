import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingModule } from './tracking/tracking.module';
import { AirportsModule } from './airports/airports.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PilotModule } from './pilot/pilot.module';
import { PlanesModule } from './planes/planes.module';
import { FinishedFlightsModule } from './finished-flights/finished-flights.module';
import { SimbriefModule } from './simbrief/simbrief.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';
import { StatsModule } from './stats/stats.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        host: configService.get('DATABASE_HOST', 'localhost'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        port: configService.get('DATABASE_PORT', 5432),
      }),
    }),
    TrackingModule,
    AirportsModule,
    PilotModule,
    PlanesModule,
    FinishedFlightsModule,
    SimbriefModule,
    SchedulesModule,
    AuthModule,
    StatsModule,
    BookingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
