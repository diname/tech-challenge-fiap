import { ProductEntity } from '@Domain/entities/product.entity';
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

  create(productModel: ProductEntity): Promise<void> {
    return this.productRepository.save(productModel);
  }
  update(productModel: ProductEntity): Promise<void> {
    return this.productRepository.update(productModel);
  }
  delete(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
  findProducts(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }

  findProductsByCategory(categoryId: number): Promise<ProductEntity[]> {
    return this.productRepository.findByCategory(categoryId);
  }
}
