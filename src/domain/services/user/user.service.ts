import { UserEntity } from '@Domain/entities/user.entity';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export interface IUserService {
  create(userModel: UserEntity): Promise<void>;
  getOne(filter: { cpf?: string; email?: string }): Promise<UserEntity>;
  getUsersByRole(role: UserRoleEnum): Promise<UserEntity[]>;
}

export const IUserServiceSymbol = Symbol('UserServiceImpl');
