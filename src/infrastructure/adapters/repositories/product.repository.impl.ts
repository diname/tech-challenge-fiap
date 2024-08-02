import { IProductRepository } from '@Domain/repositories/product.repository';
import { ProductEntity } from '@Infrastructure/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async save(product: ProductEntity): Promise<void> {
    await this.productRepository.save(product);
  }

  async update(product: ProductEntity): Promise<void> {
    await this.productRepository.update(product.id, {
      ...product,
    });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
