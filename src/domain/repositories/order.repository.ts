import { ApproveOrderCommand } from '@Application/commands/order/approve-order.command';
import { CancelOrderCommand } from '@Application/commands/order/cancel-order.command';
import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import { FindOrderByIdCommand } from '@Application/commands/order/find-order-by-id.command';
import { OrderModel } from '../../infrastructure/typeorm/models/order.model';

export interface IOrderRepository {
  createOrder(command: CreateOrderCommand): Promise<OrderModel>;
  approveOrder(command: ApproveOrderCommand): Promise<void>;
  cancelOrder(command: CancelOrderCommand): Promise<void>;
  findAllOrders(): Promise<OrderModel[]>;
  findOrderById(command: FindOrderByIdCommand): Promise<OrderModel | null>;
}

export const IOrderRepositorySymbol = Symbol('OrderRepository');
