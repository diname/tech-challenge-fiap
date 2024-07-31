import { CreateProductCommand } from '@Application/commands/product/create-product.command';
import { CategoryEntity } from '@Domain/entities/category.entity';
import { ProductEntity } from '@Domain/entities/product.entity';
import {
  IProductRepository,
  IProductRepositorySymbol,
} from '@Domain/repositories/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductRepositorySymbol)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const product = new ProductEntity();
    product.name = command.name;
    product.category = { id: command.categoryId } as CategoryEntity;
    product.description = command.description;
    product.price = command.price;
    product.figureUrl = command.figureUrl;

    await this.productRepository.save(product);
  }
}
