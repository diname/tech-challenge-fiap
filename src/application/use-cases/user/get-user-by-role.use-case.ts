import {
  IUserService,
  IUserServiceSymbol,
} from '@Domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { GetUserResponseDto } from '../../dtos/response/user/get-user.response.dto';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class GetUserByRoleUseCase {
  constructor(
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async execute(role: UserRoleEnum): Promise<GetUserResponseDto[]> {
    const users = await this.userService.getUsersByRole(role);
    return users.map((user) => UserMapper.toResponseDto(user));
  }
}
