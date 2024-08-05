import { CategoryEntity } from '@Domain/entities/category.entity';
import { CategoryModel } from '../models/category.model';

export class CategoryMapper {
  static toEntity(categoryModel: CategoryModel): CategoryEntity {
    const product = new CategoryEntity(categoryModel.id, categoryModel.name);
    return product;
  }

  static toModel(categoryEntity: CategoryEntity): CategoryModel {
    const categoryModel = new CategoryModel();
    categoryModel.id = categoryEntity.id;
    categoryModel.name = categoryEntity.name;

    return categoryModel;
  }
}
