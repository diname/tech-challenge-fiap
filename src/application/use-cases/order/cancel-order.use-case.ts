import { CancelOrderCommand } from '@Application/commands/order/cancel-order.command';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CancelOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async execute(orderId: number): Promise<void> {
    const command = new CancelOrderCommand(orderId);
    await this.orderService.cancelOrder(command);
  }
}
