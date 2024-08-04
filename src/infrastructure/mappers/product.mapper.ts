import { CategoryEntity } from '@Infrastructure/entities/category.entity';
import { ProductModel } from '../../domain/models/product.model';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(productEntity: ProductEntity): ProductModel {
    let product = new ProductModel(
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

  static toEntity(productModel: ProductModel): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.id = productModel.id;
    productEntity.name = productModel.name;
    productEntity.description = productModel.description;
    productEntity.price = productModel.price;
    productEntity.figureUrl = productModel.figureUrl;
    productEntity.enabled = productModel.enabled;
    productEntity.category = { id: productModel.categoryId } as CategoryEntity;

    return productEntity;
  }
}
