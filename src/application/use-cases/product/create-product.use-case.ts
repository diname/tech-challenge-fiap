import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRequestDto } from 'src/application/dtos/request/product.request.dto';
import { ProductReponseDto } from 'src/application/dtos/response/product.reponse.dto';
import { ProductMapper } from 'src/application/mappers/product.mapper';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(dto: ProductRequestDto): Promise<ProductReponseDto> {
    let product = await this.productService.create(ProductMapper.toEntity(dto));

    return ProductMapper.toResponseDto(product);
  }
}
