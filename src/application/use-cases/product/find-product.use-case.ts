import { ProductResponseDto } from '@Application/dtos/response/product/product.response.dto';
import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductMapper } from '../../mappers/product.mapper';

@Injectable()
export class FindProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(
    name: string,
    categoryId: number,
  ): Promise<ProductResponseDto[]> {
    const products = await this.productService.findProducts(name, categoryId);
    return products.map(ProductMapper.toResponseDto);
  }
}
