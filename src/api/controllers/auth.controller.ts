import { AuthService } from '@Domain/services/auth/auth.serviceImpl';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdentifyUserDto } from 'src/api/dto/request/identify-user.dto';
import { TokenUserDto } from 'src/api/dto/response/token-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async identifyUserByCpf(
    @Body() identifyUserDto: IdentifyUserDto,
  ): Promise<TokenUserDto> {
    return this.authService.identifyUserByCpf(identifyUserDto);
  }
}
