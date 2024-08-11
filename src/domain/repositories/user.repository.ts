import { UserEntity } from '@Domain/entities/user.entity';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export interface IUserRepository {
  save(user: UserEntity): Promise<void>;
  getUserByCpf(cpf: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  getUsersByRole(role: UserRoleEnum): Promise<UserEntity[]>;
}

export const IUserRepositorySymbol = Symbol('IUserRepository');
