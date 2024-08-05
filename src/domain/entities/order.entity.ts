import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { ProductOrderEntity } from './product-order.entity';

export class OrderEntity {
  constructor(
    public id: number,
    public totalPrice: number,
    public paymentStatus: PaymentStatusType,
    public orderStatus: OrderStatusType,
    public createdAt: Date,
    public updatedAt: Date,
    public productOrders: ProductOrderEntity[],
  ) {}
}
