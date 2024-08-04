import { CreateUserCommand } from '@Application/commands/user/create-user.command';
import { UserModel } from '@Domain/models/user.model';
import {
  IUserService,
  IUserServiceSymbol,
} from '@Domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userService.create(new UserModel({ ...command.user }));
  }
}
