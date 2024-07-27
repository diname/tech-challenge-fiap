import { UserEntity } from '@Domain/entities/user.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<void>;
}

export const IUserRepositorySymbol = Symbol('IUserRepository');
