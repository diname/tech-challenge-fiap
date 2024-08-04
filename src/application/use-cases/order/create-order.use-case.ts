import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from 'src/api/dto/request/create-order.request.dto';
import { OrderResponseDto } from 'src/api/dto/response/order.respose.dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async execute(dto: CreateOrderRequestDto): Promise<OrderResponseDto> {
    const command = new CreateOrderCommand(
      dto.totalPrice,
      dto.userId,
      dto.productOrders.map((productOrder) => ({
        productId: productOrder.productId,
        quantity: productOrder.quantity,
      })),
    );
    return await this.orderService.createOrder(command);
  }
}
