import { CreateProductCommand } from '@Application/commands/product/create-product.command';
import { CreateProductUseCase } from '@Application/use-cases/product/create-product.use-case';
import { FindProductUseCase } from '@Application/use-cases/product/find-product.use-case';
import { ProductEntity } from '@Domain/entities/product.entity';
import { TypeOrmProductRepository } from '@Infrastructure/adapters/persistence/typeorm-product.repository';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@Shared/dto/request/create-product.dto';
import { ResponseProductDto } from '@Shared/dto/response/reponse-product.dto';

@Injectable()
export class ProductService {

  constructor(
    private readonly productRepository: TypeOrmProductRepository,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductUsecase: FindProductUseCase
  ) { }

  async createProduct({ name, categoryId, price, description }: CreateProductDto): Promise<void> {
    return this.createProductUseCase.execute(
      new CreateProductCommand(name, categoryId, price, description),
    );
  }

  async getProducts(): Promise<ResponseProductDto[]> {
    let products: ProductEntity[] = await this.findProductUsecase.execute();
    if (products) {
      return products.map(product => new ResponseProductDto(product.name, product.categoryId, product.price, product.description))
    }
  }
}
