import { Inject, Injectable } from '@nestjs/common';
import {
  IProductService,
  IProductServiceSymbol,
} from 'src/core/domain/services/product/product.service';
import { ProductRequestDto } from '../../dtos/request/product.request.dto';
import { ProductReponseDto } from '../../dtos/response/product.reponse.dto';
import { ProductMapper } from '../../mappers/product.mapper';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(dto: ProductRequestDto): Promise<ProductReponseDto> {
    const product = await this.productService.create(
      ProductMapper.toEntity(dto),
    );

    return ProductMapper.toResponseDto(product);
  }
}
