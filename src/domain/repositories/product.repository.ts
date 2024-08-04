import { ProductModel } from '@Domain/models/product.model';

export interface IProductRepository {
  save(product: ProductModel): Promise<void>;
  findAll(): Promise<ProductModel[]>;
  findByCategory(categoryId: number): Promise<ProductModel[]>;
  update(product: ProductModel);
  delete(id: number);
}

export const IProductRepositorySymbol = Symbol('IProductRepository');
