import { UserEntity } from '@Domain/entities/user.entity';
import {
  IAuthService,
  IAuthServiceSymbol,
} from '@Domain/services/auth/auth.service';
import {
  IUserService,
  IUserServiceSymbol,
} from '@Domain/services/user/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyUserCredentials } from '@Shared/utils/auth.util';
import { TokenUserDto } from '../../dtos/response/user/token-user.dto';

@Injectable()
export class GetTokenUseCase {
  constructor(
    @Inject(IAuthServiceSymbol)
    private readonly authService: IAuthService,
    @Inject(IUserServiceSymbol)
    private readonly userService: IUserService,
  ) {}

  async execute(identify: {
    email?: string;
    password?: string;
    cpf?: string;
  }): Promise<TokenUserDto> {
    let user: UserEntity;

    if (identify.cpf) {
      user = await this.getUserByCpf(identify.cpf);
    }

    if (identify.email) {
      user = await this.getUserByEmail(identify.email);
      await verifyUserCredentials(identify.password, user.password);
    }

    const accessToken = await this.authService.generateToken(user);
    return { userId: user.id, accessToken };
  }

  private async getUserByCpf(cpf: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getOne({ cpf });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async getUserByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
