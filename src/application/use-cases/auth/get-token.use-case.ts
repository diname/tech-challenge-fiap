import { TokenUserDto } from '@Api/dto/response/token-user.dto';
import { GetTokenCommand } from '@Application/commands/auth/get-token.command';
import { UserModel } from '@Domain/models/user.model';
import {
  IAuthService,
  IAuthServiceSymbol,
} from '@Domain/services/auth/auth.service';
import {
  IUserService,
  IUserServiceSymbol,
} from '@Domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetTokenUseCase {
  constructor(
    @Inject(IAuthServiceSymbol)
    private readonly authService: IAuthService,
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async execute(command: GetTokenCommand): Promise<TokenUserDto> {
    let user: UserModel;

    if (command.identify.cpf) {
      user = await this.userService.getOne({ cpf: command.identify.cpf });
    }

    if (command.identify.email) {
      user = await this.userService.getOne({ email: command.identify.email });
    }

    if (!user) {
      // TODO: 403 - AUTHORIZED
      return;
    }

    const accessToken = await this.authService.generateToken(user.id);
    return { userId: user.id, accessToken };
  }
}
