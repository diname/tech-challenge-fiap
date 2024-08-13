import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderService,
  IOrderServiceSymbol,
} from 'src/core/domain/services/order/order.service';
import { OrderResponseDto } from '../../dtos/response/order.respose.dto';
import { OrderMapper } from '../../mappers/order.mapper';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(id: number): Promise<OrderResponseDto> {
    const orderEntity = await this.service.findOrderById(id);
    return OrderMapper.toResponseDto(orderEntity);
  }
}
