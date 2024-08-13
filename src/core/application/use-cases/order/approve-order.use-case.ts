import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderService,
  IOrderServiceSymbol,
} from 'src/core/domain/services/order/order.service';

@Injectable()
export class ApproveOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(id: number): Promise<void> {
    await this.service.approveOrder(id);
  }
}
