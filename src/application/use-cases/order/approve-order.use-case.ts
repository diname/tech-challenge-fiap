import { IOrderService } from '@Domain/services/order/order.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApproveOrderUseCase {
  constructor(private readonly service: IOrderService) {}

  async execute(id: number): Promise<void> {
    await this.service.approveOrder(id);
  }
}
