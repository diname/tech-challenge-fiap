import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdentifyCustomerUserDto } from '../dtos/request/identify-customer-user.dto';
import { IdentifyUserDto } from '../dtos/request/identify-user.dto';
import { TokenUserDto } from '../dtos/response/token-user.dto';
import { GetTokenUseCase } from '../use-cases/auth/get-token.use-case';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly getTokenUseCase: GetTokenUseCase) {}

  @Post('/customer')
  async identifyCustomerUser(
    @Body() identifyCustomerUserDto: IdentifyCustomerUserDto,
  ): Promise<TokenUserDto> {
    return this.getTokenUseCase.execute({
      identify: { cpf: identifyCustomerUserDto.cpf },
    });
  }

  @Post()
  async identifyUser(
    @Body() identifyUserDto: IdentifyUserDto,
  ): Promise<TokenUserDto> {
    return this.getTokenUseCase.execute({
      identify: {
        email: identifyUserDto.email,
        password: identifyUserDto.password,
      },
    });
  }
}
