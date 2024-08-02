import { UpdateProductCommand } from '@Application/commands/product/update-product.command';
import { ProductModel } from '@Domain/models/product.model';
import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    const product = new ProductModel(
      command.id,
      command.name,
      command.description,
      command.price,
      command.figureUrl,
      command.enable,
    );
    return await this.productService.update(product);
  }
}
