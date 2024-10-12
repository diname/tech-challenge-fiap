import { ProductOrderEntity } from '../entities/product-order.entity';

export interface IProductOrderRepository {
  save(productOrder: ProductOrderEntity): Promise<ProductOrderEntity>;
  update(
    id: number,
    productOrder: ProductOrderEntity,
  ): Promise<ProductOrderEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<ProductOrderEntity[]>;
  findById(id: number): Promise<ProductOrderEntity>;
}

export const IProductOrderRepositorySymbol = Symbol('IProductOrderRepository');
