import { ProductEntity } from '@Domain/entities/product.entity';
import { ProductModel } from '@Infrastructure/typeorm/models/product.model';
import { CategoryModel } from '../models/category.model';

export class ProductMapper {
  static toEntity(productModel: ProductModel): ProductEntity {
    const product = new ProductEntity(
      productModel.name,
      productModel.description,
      productModel.price,
      productModel.figureUrl,
      productModel.enabled,
      productModel.category.id,
    );

    product.categoryName = productModel.category.name;
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
    product.category = { id: productEntity.categoryId } as CategoryModel;

    return product;
  }
}
