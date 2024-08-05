import { OrderEntity } from '@Domain/entities/order.entity';
import { OrderModel } from '../models/order.model';
import { ProductOrderMapper } from './product-order.mapper';

export class OrderMapper {
  static toEntity(model: OrderModel): OrderEntity {
    if (!model) return null;

    return new OrderEntity(
      model.id,
      model.totalPrice,
      model.paymentStatus,
      model.orderStatus,
      model.createdAt,
      model.updatedAt,
      model.productOrders.map(ProductOrderMapper.toEntity),
    );
  }

  static toModel(domain: OrderEntity): OrderModel {
    if (!domain) return null;

    const model = new OrderModel();
    model.id = domain.id;
    model.totalPrice = domain.totalPrice;
    model.paymentStatus = domain.paymentStatus;
    model.orderStatus = domain.orderStatus;
    model.createdAt = domain.createdAt;
    model.updatedAt = domain.updatedAt;
    model.productOrders = domain.productOrders.map(ProductOrderMapper.toModel);

    return model;
  }
}
