import { Inject, Injectable } from '@nestjs/common';
import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(id: number): Promise<void> {
    await this.productService.delete(id);
  }
}
