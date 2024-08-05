import { IAuthService } from '@Domain/services/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';

@Injectable()
export class AuthServiceImpl implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  async generateToken(userId: number): Promise<string> {
    const jwtPayload = { id: userId };
    const userTokenConfig = this.environmentVariableService.userTokenConfig;

    return this.jwtService.signAsync(jwtPayload, {
      secret: userTokenConfig.secret,
      expiresIn: userTokenConfig.expiresIn,
    });
  }
}
