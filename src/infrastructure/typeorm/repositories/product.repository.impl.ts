import { ProductEntity } from '@Domain/entities/product.entity';
import { IProductRepository } from '@Domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: true,
    });

    return products.map((product) => {
      return ProductMapper.toEntity(product);
    });
  }

  async findByCategory(categoryId: number): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: true,
      where: {
        category: { id: categoryId },
      },
    });

    return products.map((product) => {
      return ProductMapper.toEntity(product);
    });
  }

  async save(product: ProductEntity): Promise<void> {
    await this.productRepository.save(ProductMapper.toModel(product));
  }

  async update(product: ProductEntity): Promise<void> {
    const productEntity = ProductMapper.toModel(product);

    await this.productRepository.update(productEntity.id, {
      ...productEntity,
    });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
