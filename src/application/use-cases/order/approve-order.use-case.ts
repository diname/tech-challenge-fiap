import { ApproveOrderCommand } from '@Application/commands/order/approve-order.command';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ApproveOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async execute(orderId: number): Promise<void> {
    const command = new ApproveOrderCommand(orderId);
    await this.orderService.approveOrder(command);
  }
}
