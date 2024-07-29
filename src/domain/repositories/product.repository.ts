import { ProductEntity } from '@Domain/entities/product.entity';

export interface IProductRepository {
  save(product: ProductEntity): Promise<void>;

  find(): Promise<ProductEntity[]>;
}

export const IProductRepositorySymbol = Symbol('IProductRepository');
