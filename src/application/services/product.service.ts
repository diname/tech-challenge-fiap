import { CreateProductCommand } from '@Application/commands/product/create-product.command';
import { CreateProductUseCase } from '@Application/use-cases/product/create-product.use-case';
import { FindProductUseCase } from '@Application/use-cases/product/find-product.use-case';
import { ProductEntity } from '@Domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@Shared/dto/request/create-product.request.dto';
import { ProductReponseDto } from '@Shared/dto/response/product.reponse.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductUsecase: FindProductUseCase,
  ) {}

  async createProduct({
    name,
    categoryId,
    price,
    description,
    figure,
  }: CreateProductDto): Promise<void> {
    return this.createProductUseCase.execute(
      new CreateProductCommand(name, categoryId, price, description, figure),
    );
  }

  async findProducts(): Promise<ProductReponseDto[]> {
    let products: ProductEntity[] = await this.findProductUsecase.execute();
    if (products) {
      return products.map((product) => {
        let productResponseDto = {
          category: product.category.name,
          description: product.description,
          name: product.name,
          price: product.price,
        } as ProductReponseDto;
        return productResponseDto;
      });
    }
  }
}
