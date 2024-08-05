import { ICategoryRepository } from '@Domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
  ) {}

  async find(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async save(product: CategoryEntity): Promise<void> {
    await this.categoryRepository.save(product);
  }
}
