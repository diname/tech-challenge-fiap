import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdentifyCustomerUserDto } from 'src/core/application/dtos/request/identify-customer-user.dto';
import { LoginUserDto } from 'src/core/application/dtos/request/login-user.dto';
import { TokenUserDto } from 'src/core/application/dtos/response/token-user.dto';
import { GetTokenUseCase } from 'src/core/application/use-cases/auth/get-token.use-case';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly getTokenUseCase: GetTokenUseCase) {}

  @Post('/identify/customer')
  @ApiOperation({ summary: 'Gera o token para identificação do cliente' })
  @ApiResponse({ status: 200, type: [TokenUserDto] })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  async identifyCustomerUser(
    @Body() { cpf }: IdentifyCustomerUserDto,
  ): Promise<TokenUserDto> {
    return this.getTokenUseCase.execute({ cpf });
  }

  @Post('/login')
  @ApiOperation({
    summary:
      'Gera o token para identificação da linha de produção ou administrador',
  })
  @ApiResponse({ status: 200, type: [TokenUserDto] })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  async loginUser(
    @Body() { email, password }: LoginUserDto,
  ): Promise<TokenUserDto> {
    return this.getTokenUseCase.execute({ email, password });
  }
}
