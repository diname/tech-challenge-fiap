import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateOrderRequestDto } from '../../dtos/request/order/update-order.request.dto';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(dto: UpdateOrderRequestDto): Promise<void> {
    await this.service.update(dto.id, dto.orderStatus);
  }
}
