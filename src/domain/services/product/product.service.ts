import { ProductEntity } from '@Domain/entities/product.entity';

export interface IProductService {
  create(product: ProductEntity): Promise<void>;
  update(product: ProductEntity): Promise<void>;
  delete(id: number): Promise<void>;
  findProducts(name: string, categoryId: number): Promise<ProductEntity[]>;
  findProductsByCategory(categoryId: number): Promise<ProductEntity[]>;
}

export const IProductServiceSymbol = Symbol('ProductServiceImpl');
