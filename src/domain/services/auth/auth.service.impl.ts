import { UserEntity } from '@Domain/entities/user.entity';
import { IAuthService } from '@Domain/services/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';

@Injectable()
export class AuthServiceImpl implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  async generateToken(user: UserEntity): Promise<string> {
    const jwtPayload: ITokenPayload = { sub: user.id, roles: user.roles };
    const userTokenConfig = this.environmentVariableService.userTokenConfig;

    return this.jwtService.signAsync(jwtPayload, {
      secret: userTokenConfig.secret,
      expiresIn: userTokenConfig.expiresIn,
    });
  }

  async getTokenPayloadFromAccessToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.environmentVariableService.userTokenConfig.secret,
    });
  }
}
