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

  create(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }
  update(id: number, product: ProductEntity): Promise<void> {
    return this.productRepository.update(id, product);
  }
  delete(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
  findProducts(name: string, categoryId: number): Promise<ProductEntity[]> {
    return this.productRepository.find(name, categoryId);
  }
}
