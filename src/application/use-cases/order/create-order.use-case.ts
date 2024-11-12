import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from '../../dtos/request/order/create-order.request.dto';
import { OrderResponseDto } from '../../dtos/response/order/order.response.dto';
import { OrderMapper } from '../../mappers/order.mapper';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(dto: CreateOrderRequestDto): Promise<OrderResponseDto> {
    const orderEntityRequest = OrderMapper.toCreateOrderEntity(dto);
    const orderEntity = await this.service.createOrder(orderEntityRequest);
    return OrderMapper.toResponseDto(orderEntity);
  }
}
