import { ProductEntity } from '@Domain/entities/product.entity';

export interface IProductRepository {
  save(product: ProductEntity): Promise<void>;
  find(name: string, categoryId: number): Promise<ProductEntity[]>;
  update(product: ProductEntity);
  delete(id: number);
}

export const IProductRepositorySymbol = Symbol('IProductRepository');
