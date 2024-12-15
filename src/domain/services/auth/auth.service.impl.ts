import { UserEntity } from '@Domain/entities/user.entity';
import { IAuthService } from '@Domain/services/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

@Injectable()
export class AuthServiceImpl implements IAuthService {
  private cognitoJwtVerifier: any = null;

  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {
    this.cognitoJwtVerifier = CognitoJwtVerifier.create({
      userPoolId: this.environmentVariableService.cognitoConfig.UserPoolId,
      tokenUse: 'access',
      clientId: this.environmentVariableService.cognitoConfig.ClientId,
    });
  }

  async generateToken(user: UserEntity): Promise<string> {
    const jwtPayload: ITokenPayload = { sub: user.name, roles: user.roles };
    const userTokenConfig = this.environmentVariableService.userTokenConfig;

    return this.jwtService.signAsync(jwtPayload, {
      secret: userTokenConfig.secret,
      expiresIn: userTokenConfig.expiresIn,
    });
  }

  async getTokenPayloadFromAccessToken(token: string): Promise<ITokenPayload> {
    const payload = await this.cognitoJwtVerifier.verify(token);

    const tokenPayloadResponse = {} as ITokenPayload;

    if (payload) {
      const userRoles: UserRoleEnum[] = [];

      if (payload['cognito:groups']?.includes('Administrador')) {
        userRoles.push(UserRoleEnum.ADMIN);
      } else if (payload['cognito:groups']?.includes('Cozinha')) {
        userRoles.push(UserRoleEnum.PREP_LINE);
      }

      tokenPayloadResponse.sub = payload.sub;
      tokenPayloadResponse.roles = userRoles;
    }

    return tokenPayloadResponse;
  }
}
