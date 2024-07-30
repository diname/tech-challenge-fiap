import { CategoryEntity } from '@Domain/entities/category.entity';
import { ICategoryRepository } from '@Domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async find(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async save(product: CategoryEntity): Promise<void> {
    await this.categoryRepository.save(product);
  }
}
