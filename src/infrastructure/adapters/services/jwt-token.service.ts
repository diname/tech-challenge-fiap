import { IAuthService } from '@Domain/services/auth.service';
import { EnvironmentVariableService } from '@Infrastructure/config/environment-variable/environment-variable.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  async generateUserToken(userId: string): Promise<string> {
    const jwtPayload = { id: userId };
    const userTokenConfig = this.environmentVariableService.userTokenConfig;

    return this.jwtService.signAsync(jwtPayload, {
      secret: userTokenConfig.secret,
      expiresIn: userTokenConfig.expiresIn,
    });
  }
}
