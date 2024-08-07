import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdentifyCustomerUserDto } from '../dtos/request/identify-customer-user.dto';
import { LoginUserDto } from '../dtos/request/login-user.dto';
import { TokenUserDto } from '../dtos/response/token-user.dto';
import { GetTokenUseCase } from '../use-cases/auth/get-token.use-case';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly getTokenUseCase: GetTokenUseCase) {}

  @Post('/identify/customer')
  async identifyCustomerUser(
    @Body() { cpf }: IdentifyCustomerUserDto,
  ): Promise<TokenUserDto> {
    return this.getTokenUseCase.execute({ cpf });
  }

  @Post('/login')
  async loginUser(
    @Body() { email, password }: LoginUserDto,
  ): Promise<TokenUserDto> {
    return this.getTokenUseCase.execute({ email, password });
  }
}
