export interface IAuthService {
  generateUserToken(userId: string): Promise<string>;
}

export const IAuthServiceSymbol = Symbol('IAuthService');
