import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderService,
  IOrderServiceSymbol,
} from 'src/core/domain/services/order/order.service';
import { CreateOrderRequestDto } from '../../dtos/request/create-order.request.dto';
import { OrderResponseDto } from '../../dtos/response/order.respose.dto';
import { OrderMapper } from '../../mappers/order.mapper';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(
    userId: number,
    dto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    const orderEntityRequest = OrderMapper.toCreateOrderEntity(dto);
    const orderEntity = await this.service.createOrder(
      userId,
      orderEntityRequest,
    );
    return OrderMapper.toResponseDto(orderEntity);
  }
}
