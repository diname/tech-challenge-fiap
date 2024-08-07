import { CategoryEntity } from '@Domain/entities/category.entity';
import {
  ICategoryRepository,
  ICategoryRepositorySymbol,
} from '@Domain/repositories/category.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryServiceImpl {
  constructor(
    @Inject(ICategoryRepositorySymbol)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  createCategory(categoryEntity: CategoryEntity): Promise<void> {
    return this.categoryRepository.save(categoryEntity);
  }
  updateCategory(categoryEntity: CategoryEntity): Promise<void> {
    return this.categoryRepository.update(categoryEntity);
  }
  deleteCategory(id: number): Promise<void> {
    return this.categoryRepository.delete(id);
  }
  findCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
