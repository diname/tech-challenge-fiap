import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from 'src/application/dtos/request/create-order.request.dto';
import { OrderResponseDto } from 'src/application/dtos/response/order.respose.dto';
import { OrderMapper } from 'src/application/mappers/order.mapper';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(dto: CreateOrderRequestDto): Promise<OrderResponseDto> {
    const orderEntityRequest = OrderMapper.toEntity(dto);
    const orderEntity = await this.service.createOrder(orderEntityRequest);
    return OrderMapper.toResponseDto(orderEntity);
  }
}
