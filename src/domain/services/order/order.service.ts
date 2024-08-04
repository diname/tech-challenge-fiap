import { OrderResponseDto } from '@Api/dto/response/order.respose.dto';
import { ApproveOrderCommand } from '@Application/commands/order/approve-order.command';
import { CancelOrderCommand } from '@Application/commands/order/cancel-order.command';
import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import { FindOrderByIdCommand } from '@Application/commands/order/find-order-by-id.command';

export interface IOrderService {
  createOrder(command: CreateOrderCommand): Promise<OrderResponseDto>;
  approveOrder(command: ApproveOrderCommand): Promise<void>;
  cancelOrder(command: CancelOrderCommand): Promise<void>;
  findAllOrders(): Promise<OrderResponseDto[]>;
  findOrderById(
    command: FindOrderByIdCommand,
  ): Promise<OrderResponseDto | null>;
}

export const IOrderServiceSymbol = Symbol('OrderService');
