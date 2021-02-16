import { HttpModule, Module } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PilotEntity } from './dto/pilot.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  controllers: [PilotController],
  providers: [PilotService,LocalStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([PilotEntity]),
    BookingsModule,
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  exports: [PilotService]
})
export class PilotModule { }
