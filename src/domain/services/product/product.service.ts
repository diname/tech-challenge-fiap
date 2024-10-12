import { ProductEntity } from '../../entities/product.entity';

export interface IProductService {
  create(product: ProductEntity): Promise<ProductEntity>;
  update(id: number, product: ProductEntity): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<ProductEntity>;
  findProducts(name: string, categoryId: number): Promise<ProductEntity[]>;
  findById(id: number): Promise<ProductEntity>;
}

export const IProductServiceSymbol = Symbol('ProductServiceImpl');
