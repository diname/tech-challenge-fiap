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
  }: CreateProductDto): Promise<void> {
    return this.createProductUseCase.execute(
      new CreateProductCommand(name, categoryId, price, description),
    );
  }

  async findProducts(): Promise<ProductReponseDto[]> {
    let products: ProductEntity[] = await this.findProductUsecase.execute();
    if (products) {
      return products.map(
        (product) =>
          new ProductReponseDto(
            product.name,
            product.category.id,
            product.price,
            product.description,
          ),
      );
    }
  }
}
