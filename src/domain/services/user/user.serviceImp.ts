import { UserModel } from '@Domain/models/user.model';
import {
  IUserRepository,
  IUserRepositorySymbol,
} from '@Domain/repositories/user.repository';
import { UserMapper } from '@Infrastructure/mappers/user.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './user.service';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(userModel: UserModel): Promise<void> {
    await this.userRepository.save(UserMapper.toEntity(userModel));
  }

  async getOne(filter: { cpf?: string; email?: string }): Promise<UserModel> {
    if (filter.cpf) {
      return this.userRepository.getUserByCpf(filter.cpf);
    }

    if (filter.email) {
      return this.userRepository.getUserByEmail(filter.email);
    }
  }
}
