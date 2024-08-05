import { ProductOrderEntity } from '@Domain/entities/product-order.entity';
import { ProductOrderModel } from '../models/product_order.model';
import { OrderMapper } from './order.mapper';
import { ProductMapper } from './product.mapper';

export class ProductOrderMapper {
  static toEntity(model: ProductOrderModel): ProductOrderEntity {
    if (!model) return null;

    return new ProductOrderEntity(
      model.id,
      model.quantity,
      model.createdAt,
      ProductMapper.toEntity(model.product),
      OrderMapper.toEntity(model.order),
    );
  }

  static toModel(domain: ProductOrderEntity): ProductOrderModel {
    if (!domain) return null;

    const model = new ProductOrderModel();
    model.id = domain.id;
    model.quantity = domain.quantity;
    model.createdAt = domain.createdAt;
    model.product = ProductMapper.toModel(domain.product);
    model.order = OrderMapper.toModel(domain.order);

    return model;
  }
}
