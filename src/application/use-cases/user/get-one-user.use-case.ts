import { GetOneUserCommand } from '@Application/commands/user/get-one-user.command';
import {
  IUserRepository,
  IUserRepositorySymbol,
} from '@Domain/repositories/user.repository';
import { UserEntity } from '@Infrastructure/entities/user.entity';
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
