import { Inject, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { UserEntity } from '../../entities/user.entity';
import {
  IUserRepository,
  IUserRepositorySymbol,
} from '../../repositories/user.repository';
import { IUserService } from './user.service';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(userModel: UserEntity): Promise<void> {
    await this.userRepository.save(userModel);
  }

  async getOne(filter: { cpf?: string; email?: string }): Promise<UserEntity> {
    if (filter.cpf) {
      return this.userRepository.getUserByCpf(filter.cpf);
    }

    if (filter.email) {
      return this.userRepository.getUserByEmail(filter.email);
    }
  }

  async getUsersByRole(): Promise<UserEntity[]> {
    return this.userRepository.getUsersByRole(UserRoleEnum.CUSTOMER);
  }
}
