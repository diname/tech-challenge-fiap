import { CategoryEntity } from '@Domain/entities/category.entity';

export interface ICategoryService {
  createCategory(categoryModel: CategoryEntity): Promise<void>;
  updateCategory(categoryModel: CategoryEntity): Promise<void>;
  deleteCategory(id: number): Promise<void>;
  findCategories(): Promise<CategoryEntity[]>;
}

export const ICategoryServiceSymbol = Symbol('CategoryServiceImpl');
