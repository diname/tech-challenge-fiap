import { CreateOrderRequestDto } from '@Application/dtos/request/order/create-order.request.dto';
import { UpdateOrderRequestDto } from '@Application/dtos/request/order/update-order.request.dto';
import { OrderResponseDto } from '@Application/dtos/response/order/order.response.dto';
import { CreateOrderUseCase } from '@Application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from '@Application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '@Application/use-cases/order/find-order-by-id.use-case';
import { UpdateOrderUseCase } from '@Application/use-cases/order/update-order.use-case';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUser as GetCurrentUserToken } from '@Shared/decorators/get-user-id.decorator';
import { Roles } from '@Shared/decorators/roles.decorator';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { RoleGuard } from '@Shared/guards/role-guard';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';

@ApiTags('Orders')
@Controller('/api/orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async createOrder(
    @Body() dto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.createOrderUseCase.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um pedido por ID' })
  @ApiOperation({ summary: 'Cancela um pedido' })
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.PREP_LINE)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 200,
    description: 'Pedido encontrado',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async findOrderById(@Param('id') id: number): Promise<OrderResponseDto> {
    return this.findOrderByIdUseCase.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pedidos' })
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.PREP_LINE)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos',
    type: [OrderResponseDto],
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async findAllOrders(
    @GetCurrentUserToken() userToken: ITokenPayload,
  ): Promise<OrderResponseDto[]> {
    return this.findAllOrdersUseCase.execute(userToken);
  }

  @Put()
  @ApiOperation({ summary: 'Atualiza o status do pedido' })
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.PREP_LINE)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async update(@Body() dto: UpdateOrderRequestDto): Promise<void> {
    return this.updateOrderUseCase.execute(dto);
  }
}
