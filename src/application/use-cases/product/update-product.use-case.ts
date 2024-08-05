import { UpdateProductCommand } from '@Application/commands/product/update-product.command';
import { ProductEntity } from '@Domain/entities/product.entity';
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
    const product = new ProductEntity(
      command.id,
      command.name,
      command.description,
      command.price,
      command.figureUrl,
      command.enable,
      command.categoryId,
    );
    return await this.productService.update(product);
  }
}
