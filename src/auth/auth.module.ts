import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  providers: [AuthService]
})
export class AuthModule {}
