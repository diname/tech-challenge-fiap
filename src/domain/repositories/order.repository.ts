import { ApproveOrderCommand } from '@Application/commands/order/approve-order.command';
import { CancelOrderCommand } from '@Application/commands/order/cancel-order.command';
import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import { FindOrderByIdCommand } from '@Application/commands/order/find-order-by-id.command';
import { OrderEntity } from '../../infrastructure/entities/order.entity';

export interface IOrderRepository {
  createOrder(command: CreateOrderCommand): Promise<OrderEntity>;
  approveOrder(command: ApproveOrderCommand): Promise<void>;
  cancelOrder(command: CancelOrderCommand): Promise<void>;
  findAllOrders(): Promise<OrderEntity[]>;
  findOrderById(command: FindOrderByIdCommand): Promise<OrderEntity | null>;
}

export const IOrderRepositorySymbol = Symbol('OrderRepository');
