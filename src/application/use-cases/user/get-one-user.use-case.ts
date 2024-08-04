import { GetOneUserCommand } from '@Application/commands/user/get-one-user.command';
import { UserModel } from '@Domain/models/user.model';
import {
  IUserService,
  IUserServiceSymbol,
} from '@Domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetOneUserUseCase {
  constructor(
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async execute(
    command: GetOneUserCommand,
  ): Promise<UserModel | null | undefined> {
    return this.userService.getOne({ ...command.filter });
  }
}
