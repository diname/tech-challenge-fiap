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
    // TODO: Adicionar o role no model e cadastrar no repository
    const user = new UserModel();
    user.name = command.user.name;
    user.email = command.user.email;
    user.cpf = command.user.cpf;
    user.password = command.user.password;

    await this.userService.create(user);
  }
}
