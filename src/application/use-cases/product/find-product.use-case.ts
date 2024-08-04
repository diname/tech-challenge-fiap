import { ProductReponseDto } from '@Api/dto/response/product.reponse.dto';
import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { Inject, Injectable } from '@nestjs/common';

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
