import { ApproveOrderCommand } from '@Application/commands/order/approve-order.command';
import { CancelOrderCommand } from '@Application/commands/order/cancel-order.command';
import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import { FindOrderByIdCommand } from '@Application/commands/order/find-order-by-id.command';
import {
  OrderEntity,
  OrderStatusType,
  PaymentStatusType,
} from '@Domain/entities/order.entity';
import { IOrderRepository } from '@Domain/repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) {}

  async createOrder(command: CreateOrderCommand): Promise<OrderEntity> {
    const order = new OrderEntity();
    order.totalPrice = command.totalPrice;
    // @TODO Substitua por UserEntity corretamente
    order.user = { id: command.userId } as any;
    order.paymentStatus = PaymentStatusType.PENDING;
    order.orderStatus = OrderStatusType.NONE;

    return this.repository.save(order);
  }

  async approveOrder(command: ApproveOrderCommand): Promise<void> {
    await this.repository.update(command.orderId, {
      paymentStatus: PaymentStatusType.APPROVED,
    });
  }

  async cancelOrder(command: CancelOrderCommand): Promise<void> {
    await this.repository.update(command.orderId, {
      paymentStatus: PaymentStatusType.CANCELED,
    });
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    return this.repository.find();
  }

  async findOrderById(
    command: FindOrderByIdCommand,
  ): Promise<OrderEntity | null> {
    return this.repository.findOne({ where: { id: command.orderId } });
  }
}
