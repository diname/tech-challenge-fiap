import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { OrderResponseDto } from '@Shared/dto/response/order.respose.dto';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async execute(): Promise<OrderResponseDto[]> {
    return this.orderService.findAllOrders();
  }
}