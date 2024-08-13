import { Inject, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { UserEntity } from 'src/core/domain/entities/user.entity';
import {
  IUserService,
  IUserServiceSymbol,
} from 'src/core/domain/services/user/user.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async execute(user: {
    name: string;
    email: string;
    cpf?: string;
    password?: string;
    roles: UserRoleEnum[];
  }): Promise<void> {
    await this.userService.create(new UserEntity({ ...user }));
  }
}
