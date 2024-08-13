import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { CreateOrderEntity } from '../../entities/create-order.entity';
import { OrderEntity } from '../../entities/order.entity';

export interface IOrderService {
  createOrder(order: CreateOrderEntity): Promise<OrderEntity>;
  approveOrder(id: number): Promise<void>;
  cancelOrder(id: number): Promise<void>;
  update(id: number, orderStatus: OrderStatusType): Promise<void>;
  findOrderById(id: number): Promise<OrderEntity>;
  findAllOrders(): Promise<OrderEntity[]>;
}

export const IOrderServiceSymbol = Symbol('IOrderService');
