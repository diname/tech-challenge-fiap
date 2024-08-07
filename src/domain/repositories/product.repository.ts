import { ProductEntity } from '@Domain/entities/product.entity';

export interface IProductRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  find(name: string, categoryId: number): Promise<ProductEntity[]>;
  update(id: number, product: ProductEntity);
  delete(id: number);
}

export const IProductRepositorySymbol = Symbol('IProductRepository');
