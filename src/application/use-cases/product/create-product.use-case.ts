import { CreateProductCommand } from '@Application/commands/product/create-product.command';
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
  ) { }

  async execute(command: CreateProductCommand): Promise<void> {
    const product = new ProductEntity();
    product.name = command.name;
    product.categoryId = command.categoryId;
    product.description = command.description;
    product.price = command.price;


    await this.productRepository.save(product);
  }
}
