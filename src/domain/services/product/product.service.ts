import { ProductEntity } from '@Domain/entities/product.entity';

export interface IProductService {
  create(productModel: ProductEntity): Promise<void>;
  update(productModel: ProductEntity): Promise<void>;
  delete(id: number): Promise<void>;
  findProducts(): Promise<ProductEntity[]>;
  findProductsByCategory(categoryId: number): Promise<ProductEntity[]>;
}

export const IProductServiceSymbol = Symbol('ProductServiceImpl');
