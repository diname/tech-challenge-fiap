import { ProductResponseDto } from '@Application/dtos/response/product/product.response.dto';
import { ProductMapper } from '@Application/mappers/product.mapper';
import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(
    name: string,
    categoryId: number,
  ): Promise<ProductResponseDto[]> {
    const cachedData = await this.cacheService.get<string>('products');

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const products = await this.productService.findProducts(name, categoryId);
    const productResponseDto = products.map(ProductMapper.toResponseDto);

    await this.cacheService.set(
      'products',
      JSON.stringify(productResponseDto),
      5000,
    );

    return productResponseDto;
  }
}
