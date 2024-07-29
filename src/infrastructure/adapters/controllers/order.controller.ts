import { ApproveOrderUseCase } from '@Application/use-cases/order/approve-order.use-case';
import { FindAllOrdersUseCase } from '@Application/use-cases/order/find-all-orders.use-case';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from '@Shared/dto/response/order.respose.dto';
import { CancelOrderUseCase } from '../../../application/use-cases/order/cancel-order.use-case';
import { CreateOrderUseCase } from '../../../application/use-cases/order/create-order.use-case';
import { FindOrderByIdUseCase } from '../../../application/use-cases/order/find-order-by-id.use-case';
import { CreateOrderRequestDto } from '../../../shared/dto/request/create-order.request.dto';

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
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async createOrder(
    @Body() dto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.createOrderUseCase.execute(dto);
  }

  @Put(':id/payment/approve')
  @ApiOperation({ summary: 'Aprova um pedido' })
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
