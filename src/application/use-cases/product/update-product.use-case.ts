import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRequestDto } from 'src/application/dtos/request/product.request.dto';
import { ProductMapper } from 'src/application/mappers/product.mapper';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(dto: ProductRequestDto): Promise<void> {
    return await this.productService.update(ProductMapper.toEntity(dto));
  }
}
