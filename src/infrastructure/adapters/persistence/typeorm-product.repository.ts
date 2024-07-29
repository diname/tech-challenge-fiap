import { ProductEntity } from '@Domain/entities/product.entity';
import { IProductRepository } from '@Domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }

  async find(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async save(product: ProductEntity): Promise<void> {
    await this.productRepository.save(product);
  }
}
