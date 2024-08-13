import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';
import { UserEntity } from '../../entities/user.entity';

export interface IAuthService {
  generateToken(user: UserEntity): Promise<string>;
  getTokenPayloadFromAccessToken(accessToken: string): Promise<ITokenPayload>;
}

export const IAuthServiceSymbol = Symbol('IAuthService');
