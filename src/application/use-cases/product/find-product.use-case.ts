import { ProductEntity } from '@Domain/entities/product.entity';
import {
    IProductRepository,
    IProductRepositorySymbol,
} from '@Domain/repositories/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindProductUseCase {
    constructor(
        @Inject(IProductRepositorySymbol)
        private readonly productRepository: IProductRepository,
    ) { }

    async execute(): Promise<ProductEntity[]> {
        return await this.productRepository.find();
    }
}
