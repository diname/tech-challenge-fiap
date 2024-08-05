import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { OrderResponseDto } from 'src/application/dtos/response/order.respose.dto';
import { OrderMapper } from 'src/application/mappers/order.mapper';

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
