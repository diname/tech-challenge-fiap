import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { TotalPriceValueObject } from '../value-objects/total-price.value-objects';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

export class OrderEntity {
  constructor(
    public totalPrice: TotalPriceValueObject,
    public paymentStatus: PaymentStatusType,
    public orderStatus: OrderStatusType,
    public createdAt: Date,
    public estimatedPreparationTime: number,
    public productsOrder: ProductOrderEntity[],
    public user?: UserEntity,
    public id?: number,
    public updatedAt?: Date,
    public preparationTime?: number,
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
