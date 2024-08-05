import { ProductEntity } from '@Domain/entities/product.entity';

export interface IProductRepository {
  save(product: ProductEntity): Promise<void>;
  findAll(): Promise<ProductEntity[]>;
  findByCategory(categoryId: number): Promise<ProductEntity[]>;
  update(product: ProductEntity);
  delete(id: number);
}

export const IProductRepositorySymbol = Symbol('IProductRepository');
