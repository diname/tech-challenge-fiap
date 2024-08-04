import { CreateProductCommand } from '@Application/commands/product/create-product.command';
import { ProductModel } from '@Domain/models/product.model';
import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const product = new ProductModel(
      0, // que fazer com esse parametro? o id é gerado pela base
      command.name,
      command.description,
      command.price,
      command.figureUrl,
      true,
      command.categoryId,
    );

    await this.productService.create(product);
  }
}
