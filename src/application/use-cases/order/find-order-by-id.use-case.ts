import { FindOrderByIdCommand } from '@Application/commands/order/find-order-by-id.command';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { OrderResponseDto } from '@Shared/dto/response/order.respose.dto';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async execute(orderId: number): Promise<OrderResponseDto | null> {
    const command = new FindOrderByIdCommand(orderId);
    return this.orderService.findOrderById(command);
  }
}
