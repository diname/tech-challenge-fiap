import { GetOneUserCommand } from '@Application/commands/user/get-one-user.command';
import { UserEntity } from '@Domain/entities/user.entity';
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
  ): Promise<UserEntity | null | undefined> {
    return this.userService.getOne({ ...command.filter });
  }
}
