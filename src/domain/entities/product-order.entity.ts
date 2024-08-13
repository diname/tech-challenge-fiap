import { ProductEntity } from './product.entity';

export class ProductOrderEntity {
  constructor(
    public quantity: number,
    public product: ProductEntity,
    public createdAt: Date,
    public id?: number,
  ) {}
}
