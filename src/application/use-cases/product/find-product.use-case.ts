import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductReponseDto } from '../../dtos/response/product.response.dto';
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
  ): Promise<ProductReponseDto[]> {
    const products = await this.productService.findProducts(name, categoryId);
    return products.map(ProductMapper.toResponseDto);
  }
}
