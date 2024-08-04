import { CategoryEntity } from '@Infrastructure/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class CategorySeeder extends SeederBase<CategoryEntity> {
  constructor(connection: Connection) {
    const repository = connection.getRepository(CategoryEntity);
    super(repository);
    this.tableName = 'category';
  }

  protected dataToSeed(): CategoryEntity[] {
    return [
      { id: 1, name: 'Lanche' },
      { id: 2, name: 'Bebida' },
      { id: 3, name: 'Acompanhamento' },
    ] as CategoryEntity[];
  }
}
