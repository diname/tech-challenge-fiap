import { UserModel } from '@Domain/models/user.model';

export interface IUserRepository {
  save(user: UserModel): Promise<void>;
  getUserByCpf(cpf: string): Promise<UserModel>;
  getUserByEmail(email: string): Promise<UserModel>;
}

export const IUserRepositorySymbol = Symbol('IUserRepository');
