import { ProductModel } from '@Domain/models/product.model';
import { IProductRepository } from '@Domain/repositories/product.repository';
import { ProductEntity } from '@Infrastructure/entities/product.entity';
import { ProductMapper } from '@Infrastructure/mappers/product.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    let products = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: true,
    });

    return products.map((product) => {
      return ProductMapper.toDomain(product);
    });
  }

  async findByCategory(categoryId: number): Promise<ProductModel[]> {
    let products = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: true,
      where: {
        category: { id: categoryId },
      },
    });

    return products.map((product) => {
      return ProductMapper.toDomain(product);
    });
  }

  async save(product: ProductModel): Promise<void> {
    await this.productRepository.save(ProductMapper.toEntity(product));
  }

  async update(product: ProductModel): Promise<void> {
    var productEntity = ProductMapper.toEntity(product);

    await this.productRepository.update(productEntity.id, {
      ...productEntity,
    });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
