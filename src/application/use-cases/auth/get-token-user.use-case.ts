import {
  IAuthService,
  IAuthServiceSymbol,
} from '@Domain/services/auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenInterface } from '@Shared/interfaces/access-token.interface';

@Injectable()
export class GetTokenUserUseCase {
  constructor(
    @Inject(IAuthServiceSymbol)
    private readonly authService: IAuthService,
  ) { }

  async execute(userId: number): Promise<AccessTokenInterface> {
    const accessToken = await this.authService.generateUserToken(userId);
    return { accessToken };
  }
}
