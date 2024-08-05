import { OrderEntity } from '@Domain/entities/order.entity';

export interface IOrderService {
  createOrder(order: OrderEntity): Promise<OrderEntity>;
  approveOrder(id: number): Promise<void>;
  cancelOrder(id: number): Promise<void>;
  findOrderById(id: number): Promise<OrderEntity>;
  findAllOrders(): Promise<OrderEntity[]>;
}

export const IOrderServiceSymbol = Symbol('IOrderService');
