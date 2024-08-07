import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { RoleGuard } from '@Shared/guards/auth-guard';
import { Roles } from '@Shared/guards/roles.decorator';
import { CreateOrderRequestDto } from '../dtos/request/create-order.request.dto';
import { OrderResponseDto } from '../dtos/response/order.respose.dto';
import { ApproveOrderUseCase } from '../use-cases/order/approve-order.use-case';
import { CancelOrderUseCase } from '../use-cases/order/cancel-order.use-case';
import { CreateOrderUseCase } from '../use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from '../use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '../use-cases/order/find-order-by-id.use-case';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly approveOrderUseCase: ApproveOrderUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso',
    type: OrderResponseDto,
  })
  @Roles(UserRoleEnum.CUSTOMER, UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async createOrder(
    @Body() dto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.createOrderUseCase.execute(dto);
  }

  @Put(':id/payment/approve')
  @ApiOperation({ summary: 'Aprova um pedido' })
  @Roles(UserRoleEnum.CUSTOMER, UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 200,
    description: 'Pedido aprovado com sucesso',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async approveOrder(@Param('id') id: number): Promise<void> {
    return this.approveOrderUseCase.execute(id);
  }

  @Put(':id/payment/cancel')
  @ApiOperation({ summary: 'Cancela um pedido' })
  @Roles(UserRoleEnum.CUSTOMER, UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 200,
    description: 'Pedido cancelado com sucesso',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async cancelOrder(@Param('id') id: number): Promise<void> {
    return this.cancelOrderUseCase.execute(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um pedido por ID' })
  @ApiOperation({ summary: 'Cancela um pedido' })
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.PREP_LINE)
  @UseGuards(RoleGuard)
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
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos',
    type: [OrderResponseDto],
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async findAllOrders(): Promise<OrderResponseDto[]> {
    return this.findAllOrdersUseCase.execute();
  }
}
