import { UserEntity } from '@Domain/entities/user.entity';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';

export interface IAuthService {
  generateToken(user: UserEntity): Promise<string>;
  getTokenPayloadFromAccessToken(accessToken: string): Promise<ITokenPayload>;
}

export const IAuthServiceSymbol = Symbol('IAuthService');
