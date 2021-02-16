import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PilotService } from 'src/pilot/pilot.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private pilotService: PilotService) {
    super({usernameField: 'email'});
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.pilotService.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}