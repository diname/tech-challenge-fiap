import { CreateUserCommand } from '@Application/commands/user/create-user.command';
import { CreateUserUseCase } from '@Application/use-cases/user/create-user.use-case';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@Shared/dto/request/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser({ username, email, cpf }: CreateUserDto): Promise<void> {
    return this.createUserUseCase.execute(
      new CreateUserCommand(username, email, cpf),
    );
  }
}
