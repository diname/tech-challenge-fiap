import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductModel } from '../models/product.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class ProductSeeder extends SeederBase<ProductModel> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(ProductModel);
    super(repository);
    this.tableName = 'Product';
  }

  protected dataToSeed(): ProductModel[] {
    return [
      {
        id: 1,
        category: { id: 1 },
        name: 'Hamburguer',
        price: 20,
        preparationTime: 10,
        figureUrl: 'https://pxhere.com/pt/photo/1420129',
        enabled: true,
        description: 'Hambuguer de carne',
      },
      {
        id: 2,
        category: { id: 2 },
        name: 'Batatas fritas',
        price: 5,
        preparationTime: 5,
        figureUrl: 'https://pxhere.com/pt/photo/1551205',
        enabled: true,
        description: 'Batata fritas crocantes',
      },
      {
        id: 3,
        category: { id: 3 },
        name: 'Coca-cola',
        price: 20,
        preparationTime: 1,
        figureUrl:
          'https://upload.wikimedia.org/wikipedia/commons/6/68/Caffeine_Free_Coca-Cola_Zero.jpg',
        enabled: true,
        description: 'Coca-cola zero',
      },
      {
        id: 4,
        category: { id: 4 },
        name: 'Milk Shake',
        preparationTime: 3,
        price: 20,
        figureUrl: 'https://pxhere.com/pt/photo/1420129',
        enabled: true,
        description: 'Milk Shake de morango',
      },
    ] as ProductModel[];
  }
}
