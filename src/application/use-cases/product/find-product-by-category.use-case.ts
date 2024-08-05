import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductReponseDto } from 'src/application/dtos/response/product.reponse.dto';

@Injectable()
export class FindProductByCategoryUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(categoryId: number): Promise<ProductReponseDto[]> {
    const products =
      await this.productService.findProductsByCategory(categoryId);
    return products.map((product) => {
      const response = new ProductReponseDto();
      (response.id = product.id), (response.name = product.name);
      response.description = product.description;
      response.category = product.categoryName;
      response.price = product.price;
      return response;
    });
  }
}
