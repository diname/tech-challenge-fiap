import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';
import { UserEntity } from 'src/core/domain/entities/user.entity';
import { IAuthService } from 'src/core/domain/services/auth/auth.service';

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
