import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductReponseDto } from 'src/application/dtos/response/product.reponse.dto';
import { ProductMapper } from 'src/application/mappers/product.mapper';

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
