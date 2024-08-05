import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

export class ProductOrderEntity {
  constructor(
    public id: number,
    public quantity: number,
    public createdAt: Date,
    public product: ProductEntity,
    public order: OrderEntity,
  ) {}
}
