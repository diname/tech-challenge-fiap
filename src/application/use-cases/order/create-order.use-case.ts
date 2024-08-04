import { CreateOrderRequestDto } from '@Api/dto/request/create-order.request.dto';
import { OrderResponseDto } from '@Api/dto/response/order.respose.dto';
import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';

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
