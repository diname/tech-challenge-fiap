import { UserEntity } from '@Domain/entities/user.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<void>;
  getUserByCpf(cpf: string): Promise<UserEntity>;
}

export const IUserRepositorySymbol = Symbol('IUserRepository');
