import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<void>;
  getUserByCpf(cpf: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  getUsersByRole(role: UserRoleEnum): Promise<UserEntity[]>;
}

export const IUserRepositorySymbol = Symbol('IUserRepository');
