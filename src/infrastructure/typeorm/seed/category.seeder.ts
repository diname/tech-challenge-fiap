import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class CategorySeeder extends SeederBase<CategoryModel> {
  constructor(connection: Connection) {
    const repository = connection.getRepository(CategoryModel);
    super(repository);
    this.tableName = 'Category';
  }

  protected dataToSeed(): CategoryModel[] {
    return [
      { id: 1, name: 'Lanche' },
      { id: 2, name: 'Bebida' },
      { id: 3, name: 'Acompanhamento' },
    ] as CategoryModel[];
  }
}
