import { GetOneUserCommand } from '@Application/commands/user/get-one-user.command';
import { GetTokenUserUseCase } from '@Application/use-cases/auth/get-token-user.use-case';
import { GetOneUserUseCase } from '@Application/use-cases/user/get-one-user.use-case';
import { Injectable } from '@nestjs/common';
import { IdentifyUserDto } from '@Shared/dto/request/identify-user.dto';
import { TokenUserDto } from '@Shared/dto/response/token-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly getTokenUserUseCase: GetTokenUserUseCase,
  ) {}

  async identifyUserByCpf(
    identifyUserDto: IdentifyUserDto,
  ): Promise<TokenUserDto> {
    const user = await this.getOneUserUseCase.execute(
      new GetOneUserCommand({ cpf: identifyUserDto.cpf }),
    );
    if (!user) {
      // TODO: Exception
      return;
    }

    const { accessToken } = await this.getTokenUserUseCase.execute(user.id);
    return { userId: user.id, accessToken };
  }
}
