import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@Shared/decorators/roles.decorator';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { RoleGuard } from '@Shared/guards/role-guard';
import { CreateCustomerUserDto } from 'src/core/application/dtos/request/create-customer-user.dto';
import { CreateUserDto } from 'src/core/application/dtos/request/create-user.dto';
import { GetUserResponseDto } from 'src/core/application/dtos/response/get-user.response.dto';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user.use-case';
import { GetUserByRoleUseCase } from 'src/core/application/use-cases/user/get-user-by-role.use-case';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByRoleUseCase: GetUserByRoleUseCase,
  ) {}

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
  @ApiBearerAuth()
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

  @Get('/customer')
  @ApiOperation({
    summary: 'Lista todos os usuários clientes',
  })
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 200, type: [GetUserResponseDto] })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 500 })
  async getCustomers(): Promise<GetUserResponseDto[]> {
    return this.getUserByRoleUseCase.execute(UserRoleEnum.CUSTOMER);
  }
}
