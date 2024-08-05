import { IOrderService } from '@Domain/services/order/order.service';
import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from 'src/application/dtos/response/order.respose.dto';
import { OrderMapper } from 'src/application/mappers/order.mapper';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(private readonly service: IOrderService) {}

  async execute(id: number): Promise<OrderResponseDto> {
    const orderEntity = await this.service.findOrderById(id);
    return OrderMapper.toResponseDto(orderEntity);
  }
}
