import { UserEntity } from '@Domain/entities/user.entity';

export interface IUserService {
  create(userModel: UserEntity): Promise<void>;
  getOne(filter: { cpf?: string; email?: string }): Promise<UserEntity>;
}

export const IUserServiceSymbol = Symbol('UserServiceImpl');
