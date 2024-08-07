import { UserEntity } from '@Domain/entities/user.entity';
import {
  IUserService,
  IUserServiceSymbol,
} from '@Domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';

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
