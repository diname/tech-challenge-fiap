import { GetUserResponseDto } from '@Application/dtos/response/get-user.response.dto';
import { UserMapper } from '@Application/mappers/user.mapper';
import {
  IUserService,
  IUserServiceSymbol,
} from '@Domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';

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
