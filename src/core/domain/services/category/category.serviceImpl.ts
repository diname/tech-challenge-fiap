import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../entities/category.entity';
import {
  ICategoryRepository,
  ICategoryRepositorySymbol,
} from '../../repositories/category.repository';

@Injectable()
export class CategoryServiceImpl {
  constructor(
    @Inject(ICategoryRepositorySymbol)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  createCategory(categoryEntity: CategoryEntity): Promise<void> {
    return this.categoryRepository.save(categoryEntity);
  }
  updateCategory(id: number, categoryEntity: CategoryEntity): Promise<void> {
    return this.categoryRepository.update(id, categoryEntity);
  }
  deleteCategory(id: number): Promise<void> {
    return this.categoryRepository.delete(id);
  }
  findCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
