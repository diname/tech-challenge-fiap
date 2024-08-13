import { OrderEntity } from '../entities/order.entity';

export interface IOrderRepository {
  save(order: OrderEntity): Promise<OrderEntity>;
  update(id: number, order: OrderEntity): Promise<OrderEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<OrderEntity[]>;
  findById(id: number): Promise<OrderEntity>;
}

export const IOrderRepositorySymbol = Symbol('IOrderRepository');
