import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class CategorySeeder extends SeederBase<CategoryModel> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(CategoryModel);
    super(repository);
    this.tableName = 'Category';
  }

  protected dataToSeed(): CategoryModel[] {
    return [
      { id: 1, name: 'Lanche' },
      { id: 2, name: 'Acompanhamento' },
      { id: 3, name: 'Bebida' },
      { id: 4, name: 'Sobremesa' },
    ] as CategoryModel[];
  }
}
