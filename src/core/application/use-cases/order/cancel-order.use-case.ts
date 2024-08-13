import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderService,
  IOrderServiceSymbol,
} from 'src/core/domain/services/order/order.service';

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
