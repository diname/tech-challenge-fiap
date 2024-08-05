import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRequestDto } from 'src/application/dtos/request/create-product.request.dto';
import { ProductMapper } from 'src/application/mappers/product.mapper';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(dto: ProductRequestDto): Promise<void> {
    await this.productService.create(ProductMapper.toEntity(dto));
  }
}
