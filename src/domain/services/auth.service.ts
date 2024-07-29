export interface IAuthService {
  generateUserToken(userId: number): Promise<string>;
}

export const IAuthServiceSymbol = Symbol('IAuthService');
