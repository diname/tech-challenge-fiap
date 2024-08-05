import { GetTokenUseCase } from '@Application/use-cases/auth/get-token.use-case';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
