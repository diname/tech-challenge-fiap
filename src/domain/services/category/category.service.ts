import { CategoryEntity } from '../../entities/category.entity';

export interface ICategoryService {
  createCategory(categoryModel: CategoryEntity): Promise<void>;
  updateCategory(id: number, categoryModel: CategoryEntity): Promise<void>;
  deleteCategory(id: number): Promise<void>;
  findCategories(): Promise<CategoryEntity[]>;
}

export const ICategoryServiceSymbol = Symbol('CategoryServiceImpl');
