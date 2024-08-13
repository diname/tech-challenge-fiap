import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderService,
  IOrderServiceSymbol,
} from 'src/core/domain/services/order/order.service';
import { UpdateOrderRequestDto } from '../../dtos/request/update-order.request.dto';

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
