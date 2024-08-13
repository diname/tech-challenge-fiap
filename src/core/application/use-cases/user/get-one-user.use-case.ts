import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/domain/entities/user.entity';
import {
  IUserService,
  IUserServiceSymbol,
} from 'src/core/domain/services/user/user.service';

@Injectable()
export class GetOneUserUseCase {
  constructor(
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async execute(filters: {
    cpf?: string;
    email?: string;
    password?: string;
  }): Promise<UserEntity | null | undefined> {
    return this.userService.getOne({ ...filters });
  }
}
