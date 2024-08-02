import { ProductModel } from '@Domain/models/product.model';
import {
  IProductRepository,
  IProductRepositorySymbol,
} from '@Domain/repositories/product.repository';
import { ProductMapper } from '@Infrastructure/mappers/product.mapper';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductServiceImpl {
  constructor(
    @Inject(IProductRepositorySymbol)
    private readonly productRepository: IProductRepository,
  ) {}

  create(productModel: ProductModel): Promise<void> {
    return this.productRepository.save(ProductMapper.toEntity(productModel));
  }
  update(productModel: ProductModel): Promise<void> {
    return this.productRepository.update(ProductMapper.toEntity(productModel));
  }
  delete(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
  findProducts(): Promise<ProductModel[]> {
    return this.productRepository.findAll();
  }
}
