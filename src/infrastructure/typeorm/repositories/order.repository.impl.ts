import { ApproveOrderCommand } from '@Application/commands/order/approve-order.command';
import { CancelOrderCommand } from '@Application/commands/order/cancel-order.command';
import { CreateOrderCommand } from '@Application/commands/order/create-order.command';
import { FindOrderByIdCommand } from '@Application/commands/order/find-order-by-id.command';
import { IOrderRepository } from '@Domain/repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { Repository } from 'typeorm';
import { OrderModel } from '../models/order.model';

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly repository: Repository<OrderModel>,
  ) {}

  async createOrder(command: CreateOrderCommand): Promise<OrderModel> {
    const order = new OrderModel();
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

  async findAllOrders(): Promise<OrderModel[]> {
    return this.repository.find();
  }

  async findOrderById(
    command: FindOrderByIdCommand,
  ): Promise<OrderModel | null> {
    return this.repository.findOne({ where: { id: command.orderId } });
  }
}
