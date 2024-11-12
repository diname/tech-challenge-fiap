import { ProductResponseDto } from '@Application/dtos/response/product/product.response.dto';
import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRequestDto } from '../../dtos/request/product/product.request.dto';
import { ProductMapper } from '../../mappers/product.mapper';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(dto: ProductRequestDto): Promise<ProductResponseDto> {
    const product = await this.productService.create(
      ProductMapper.toEntity(dto),
    );

    return ProductMapper.toResponseDto(product);
  }
}
