export interface IAuthService {
  generateToken(userId: number): Promise<string>;
}

export const IAuthServiceSymbol = Symbol('IAuthService');
