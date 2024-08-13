import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from '../../entities/product.entity';
import {
  IProductRepository,
  IProductRepositorySymbol,
} from '../../repositories/product.repository';
import { IProductService } from './product.service';

@Injectable()
export class ProductServiceImpl implements IProductService {
  constructor(
    @Inject(IProductRepositorySymbol)
    private readonly productRepository: IProductRepository,
  ) {}
  findById(id: number): Promise<ProductEntity> {
    return this.productRepository.findById(id);
  }

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
