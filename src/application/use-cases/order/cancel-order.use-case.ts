import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CancelOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async execute(id: number): Promise<void> {
    await this.orderService.cancelOrder(id);
  }
}
