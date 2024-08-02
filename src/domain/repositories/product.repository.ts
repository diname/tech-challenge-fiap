import { ProductEntity } from '@Infrastructure/entities/product.entity';

export interface IProductRepository {
  save(product: ProductEntity): Promise<void>;
  findAll(): Promise<ProductEntity[]>;
  update(product: ProductEntity);
  delete(id: number);
}

export const IProductRepositorySymbol = Symbol('IProductRepository');
