import { CategoryEntity } from '@Domain/entities/category.entity';
import { ICategoryRepository } from '@Domain/repositories/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryMapper } from '../mappers/category.mapper';
import { CategoryModel } from '../models/category.model';

export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly repository: Repository<CategoryModel>,
  ) {}

  async find(): Promise<CategoryEntity[]> {
    const categories = await this.repository.find();
    return categories.map(CategoryMapper.toEntity);
  }

  async save(category: CategoryEntity): Promise<void> {
    this.repository.save(CategoryMapper.toModel(category));
  }
}
