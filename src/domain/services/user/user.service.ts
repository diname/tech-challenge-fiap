import { UserModel } from '@Domain/models/user.model';

export interface IUserService {
  create(userModel: UserModel): Promise<void>;
  getOne(filter: { cpf?: string; email?: string }): Promise<UserModel>;
}

export const IUserServiceSymbol = Symbol('UserServiceImpl');
