import { ProductOrderEntity } from '@Domain/entities/order.entity';
import { ProductOrderModel } from '../models/product-order.model';
import { ProductMapper } from './product.mapper';

export class ProductOrderMapper {
  static toEntity(orderModel: ProductOrderModel): ProductOrderEntity {
    if (!orderModel) return null;

    return new ProductOrderEntity(
      orderModel.quantity,
      ProductMapper.toEntity(orderModel.product),
      orderModel.createdAt,
      orderModel.id,
    );
  }

  static toModel(orderEntity: ProductOrderEntity): ProductOrderModel {
    if (!orderEntity) return null;

    const model = new ProductOrderModel();
    model.id = orderEntity.id;
    model.quantity = orderEntity.quantity;
    model.createdAt = orderEntity.createdAt;
    model.product = ProductMapper.toModel(orderEntity.product);

    return model;
  }
}
