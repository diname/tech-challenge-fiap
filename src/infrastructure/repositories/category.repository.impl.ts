import { CategoryEntity } from '@Domain/entities/category.entity';
import { ICategoryRepository } from '@Domain/repositories/category.repository';
import { CategoryMapper } from '@Infrastructure/typeorm/mappers/category.mapper';
import { CategoryModel } from '@Infrastructure/typeorm/models/category.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly repository: Repository<CategoryModel>,
  ) {}

  async find(): Promise<CategoryEntity[]> {
    const categories = await this.repository.find({ order: { name: 'ASC' } });
    return categories.map(CategoryMapper.toEntity);
  }

  async save(category: CategoryEntity): Promise<void> {
    await this.repository.save(CategoryMapper.toModel(category));
  }

  async update(id: number, category: CategoryEntity): Promise<void> {
    const categoryEntity = CategoryMapper.toModel(category);
    await this.repository.update(id, { ...categoryEntity });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
