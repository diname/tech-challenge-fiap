import { ProductModel } from '@Domain/models/product.model';

export interface IProductService {
  create(productModel: ProductModel): Promise<void>;
  update(productModel: ProductModel): Promise<void>;
  delete(id: number): Promise<void>;
  findProducts(): Promise<ProductModel[]>;
  findProductsByCategory(categoryId: number): Promise<ProductModel[]>;
}

export const IProductServiceSymbol = Symbol('ProductServiceImpl');
