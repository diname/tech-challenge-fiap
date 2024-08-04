import { ProductModel } from '@Domain/models/product.model';
import {
  IProductRepository,
  IProductRepositorySymbol,
} from '@Domain/repositories/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductServiceImpl {
  constructor(
    @Inject(IProductRepositorySymbol)
    private readonly productRepository: IProductRepository,
  ) {}

  create(productModel: ProductModel): Promise<void> {
    return this.productRepository.save(productModel);
  }
  update(productModel: ProductModel): Promise<void> {
    return this.productRepository.update(productModel);
  }
  delete(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
  findProducts(): Promise<ProductModel[]> {
    return this.productRepository.findAll();
  }

  findProductsByCategory(categoryId: number): Promise<ProductModel[]> {
    return this.productRepository.findByCategory(categoryId);
  }
}
