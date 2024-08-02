import { ProductModel } from '../../domain/models/product.model';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(productEntity: ProductEntity): ProductModel {
    return new ProductModel(
      productEntity.id,
      productEntity.name,
      productEntity.description,
      productEntity.price,
      productEntity.figureUrl,
      productEntity.enabled,
    );
  }

  static toEntity(productModel: ProductModel): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.id = productModel.id;
    productEntity.name = productModel.name;
    productEntity.description = productModel.description;
    productEntity.price = productModel.price;
    productEntity.figureUrl = productModel.figureUrl;
    productEntity.enabled = productModel.enabled;

    return productEntity;
  }
}
