import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/core/domain/entities/order.entity';
import { IOrderRepository } from 'src/core/domain/repositories/order.repository';
import { Repository } from 'typeorm';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderModel } from '../models/order.model';

export class OrderRepositoryImpl implements IOrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly repository: Repository<OrderModel>,
  ) {}

  async save(order: OrderEntity): Promise<OrderEntity> {
    const orderModel = OrderMapper.toModel(order);
    console.log({ orderModel });
    const savedModel = await this.repository.save(orderModel);
    return OrderMapper.toEntity(savedModel);
  }

  async update(id: number, order: OrderEntity): Promise<OrderEntity> {
    const orderModel = await this.repository.preload({
      id: id,
      ...OrderMapper.toModel(order),
    });
    if (!orderModel) return null;
    const updatedModel = await this.repository.save(orderModel);
    return OrderMapper.toEntity(updatedModel);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.repository.find();
    return orders.map(OrderMapper.toEntity);
  }

  async findById(id: number): Promise<OrderEntity> {
    const order = await this.repository.findOne({ where: { id } });
    return OrderMapper.toEntity(order);
  }
}
