import { OrderEntity } from '@Domain/entities/order.entity';
import {
  IOrderRepository,
  IOrderRepositorySymbol,
} from '@Domain/repositories/order.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { IOrderService } from './order.service';

@Injectable()
export class OrderServiceImpl implements IOrderService {
  constructor(
    @Inject(IOrderRepositorySymbol)
    private readonly repository: IOrderRepository,
  ) {}

  async createOrder(order: OrderEntity): Promise<OrderEntity> {
    return this.repository.save(order);
  }

  async approveOrder(id: number): Promise<void> {
    const order = await this.repository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    order.paymentStatus = PaymentStatusType.APPROVED;
    this.repository.save(order);
  }

  async cancelOrder(id: number): Promise<void> {
    const order = await this.repository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    order.paymentStatus = PaymentStatusType.CANCELED;
    this.repository.save(order);
  }

  async findOrderById(id: number): Promise<OrderEntity> {
    return this.repository.findById(id);
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    return this.repository.findAll();
  }
}
