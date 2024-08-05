import { ProductEntity } from '@Domain/entities/product.entity';
import { ProductModel } from '@Infrastructure/typeorm/models/product.model';
import { CategoryModel } from '../models/category.model';

export class ProductMapper {
  static toEntity(productEntity: ProductModel): ProductEntity {
    const product = new ProductEntity(
      productEntity.id,
      productEntity.name,
      productEntity.description,
      productEntity.price,
      productEntity.figureUrl,
      productEntity.enabled,
      productEntity.category.id,
    );

    product.categoryName = productEntity.category.name;

    return product;
  }

  static toModel(productModel: ProductEntity): ProductModel {
    const product = new ProductModel();
    product.id = productModel.id;
    product.name = productModel.name;
    product.description = productModel.description;
    product.price = productModel.price;
    product.figureUrl = productModel.figureUrl;
    product.enabled = productModel.enabled;
    product.category = { id: productModel.categoryId } as CategoryModel;

    return product;
  }
}
