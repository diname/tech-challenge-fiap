import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';
import { ProductReponseDto } from 'src/application/dtos/response/product.reponse.dto';

@Injectable()
export class FindProductUseCase {
  constructor(
    @Inject(IProductServiceSymbol)
    private readonly productService: IProductService,
  ) {}

  async execute(): Promise<ProductReponseDto[]> {
    const products = await this.productService.findProducts();
    return products.map((product) => {
      const response = new ProductReponseDto();
      response.id = product.id;
      response.name = product.name;
      response.description = product.description;
      response.price = product.price;
      response.category = product.categoryName;
      return response;
    });
  }
}
