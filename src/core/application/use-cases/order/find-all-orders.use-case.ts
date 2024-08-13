import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderService,
  IOrderServiceSymbol,
} from 'src/core/domain/services/order/order.service';
import { OrderResponseDto } from '../../dtos/response/order.respose.dto';
import { OrderMapper } from '../../mappers/order.mapper';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(): Promise<OrderResponseDto[]> {
    const orderEntities = await this.service.findAllOrders();
    return orderEntities.map(OrderMapper.toResponseDto);
  }
}
