import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

export class OrderEntity {
  constructor(
    public totalPrice: number,
    public paymentStatus: PaymentStatusType,
    public orderStatus: OrderStatusType,
    public createdAt: Date,
    public productsOrder: ProductOrderEntity[],
    public user?: UserEntity,
    public id?: number,
    public updatedAt?: Date,
  ) {}
}

export class ProductOrderEntity {
  constructor(
    public quantity: number,
    public product: ProductEntity,
    public createdAt: Date,
    public id?: number,
  ) {}
}
