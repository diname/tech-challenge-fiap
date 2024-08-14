import { Inject, Injectable } from '@nestjs/common';
import { ITokenPayload } from '@Shared/interfaces/token-payload.interface';
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

  async execute(userToken: ITokenPayload): Promise<OrderResponseDto[]> {
    const orderEntities = await this.service.findAllOrders(userToken);
    return orderEntities.map(OrderMapper.toResponseDto);
  }
}
