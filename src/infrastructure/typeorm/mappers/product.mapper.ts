import { ProductModel } from '@Infrastructure/typeorm/models/product.model';

import { ProductEntity } from '@Domain/entities/product.entity';
import { CategoryModel } from '../models/category.model';
import { CategoryMapper } from './category.mapper';

export class ProductMapper {
  static toEntity(productModel: ProductModel): ProductEntity {
    const product = new ProductEntity(
      productModel.name,
      productModel.description,
      productModel.price,
      productModel.preparationTime,
      productModel.figureUrl,
      productModel.enabled,
      CategoryMapper.toEntity(productModel.category),
    );

    product.id = productModel.id;
    return product;
  }

  static toModel(productEntity: ProductEntity): ProductModel {
    const product = new ProductModel();
    product.id = productEntity.id;
    product.name = productEntity.name;
    product.description = productEntity.description;
    product.price = productEntity.price;
    product.figureUrl = productEntity.figureUrl;
    product.enabled = productEntity.enabled;
    product.preparationTime = productEntity.preparationTime;
    product.category = { id: productEntity.category.id } as CategoryModel;

    return product;
  }
}
