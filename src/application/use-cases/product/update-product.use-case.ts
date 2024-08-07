import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductUpdateRequestDto } from 'src/application/dtos/request/product.request.dto';
import { ProductMapper } from 'src/application/mappers/product.mapper';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(id: number, dto: ProductUpdateRequestDto): Promise<void> {
    return await this.productService.update(
      id,
      ProductMapper.toEntityUpdate(dto),
    );
  }
}
