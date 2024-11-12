import { CategoryEntity } from '@Domain/entities/category.entity';
import { CategoryModel } from '../models/category.model';

export class CategoryMapper {
  static toEntity(categoryModel: CategoryModel): CategoryEntity {
    const category = new CategoryEntity(categoryModel.name);
    category.id = categoryModel.id;
    return category;
  }

  static toModel(categoryEntity: CategoryEntity): CategoryModel {
    const categoryModel = new CategoryModel();
    categoryModel.id = categoryEntity.id;
    categoryModel.name = categoryEntity.name;

    return categoryModel;
  }
}
