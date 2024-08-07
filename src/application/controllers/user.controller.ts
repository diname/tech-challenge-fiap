import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { RoleGuard } from '@Shared/guards/auth-guard';
import { Roles } from '@Shared/guards/roles.decorator';
import { CreateCustomerUserDto } from '../dtos/request/create-customer-user.dto';

import { CreateUserDto } from '../dtos/request/create-user.dto';
import { CreateUserUseCase } from '../use-cases/user/create-user.use-case';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/customer')
  @ApiOperation({ summary: 'Cadastra um novo usuário cliente' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async createCustomerUser(
    @Body() createCustomerUserDto: CreateCustomerUserDto,
  ): Promise<void> {
    return this.createUserUseCase.execute({
      name: createCustomerUserDto.name,
      email: createCustomerUserDto.email,
      cpf: createCustomerUserDto.cpf,
      roles: [UserRoleEnum.CUSTOMER],
    });
  }

  @Post('/prep-line')
  @ApiOperation({
    summary: 'Cadastra um novo usuário para a linha de produção',
  })
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async createPreplineUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    return this.createUserUseCase.execute({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      roles: [UserRoleEnum.PREP_LINE],
    });
  }
}
