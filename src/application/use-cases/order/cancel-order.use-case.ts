import { IOrderService } from '@Domain/services/order/order.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CancelOrderUseCase {
  constructor(private readonly orderService: IOrderService) {}

  async execute(id: number): Promise<void> {
    await this.orderService.cancelOrder(id);
  }
}
