import { GetOneUserCommand } from '@Application/commands/user/get-one-user.command';
import { UserEntity } from '@Domain/entities/user.entity';
import {
  IUserRepository,
  IUserRepositorySymbol,
} from '@Domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetOneUserUseCase {
  constructor(
    @Inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    fields,
  }: GetOneUserCommand): Promise<UserEntity | null | undefined> {
    if (fields.cpf) {
      return this.userRepository.getUserByCpf(fields.cpf);
    }
  }
}
