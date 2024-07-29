import { CreateUserCommand } from '@Application/commands/user/create-user.command';
import { UserEntity } from '@Domain/entities/user.entity';
import {
  IUserRepository,
  IUserRepositorySymbol,
} from '@Domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = new UserEntity();
    user.name = command.name;
    user.email = command.email;
    user.cpf = command.cpf;

    await this.userRepository.save(user);
  }
}
