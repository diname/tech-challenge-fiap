import { OrderEntity } from '@Domain/entities/order.entity';
import { OrderModel } from '../models/order.model';
import { ProductOrderMapper } from './product-order.mapper';
import { UserMapper } from './user.mapper';

export class OrderMapper {
  static toEntity(orderModel: OrderModel): OrderEntity {
    if (!orderModel) return null;

    return new OrderEntity(
      orderModel.totalPrice,
      orderModel.paymentStatus,
      orderModel.orderStatus,
      orderModel.createdAt,
      orderModel.productOrders.map(ProductOrderMapper.toEntity),
      UserMapper.toEntity(orderModel.user),
      orderModel.id,
      orderModel.updatedAt,
    );
  }

  static toModel(orderEntity: OrderEntity): OrderModel {
    if (!orderEntity) return null;

    const model = new OrderModel();
    model.id = orderEntity.id;
    model.totalPrice = orderEntity.totalPrice;
    model.paymentStatus = orderEntity.paymentStatus;
    model.orderStatus = orderEntity.orderStatus;
    model.createdAt = orderEntity.createdAt;
    model.updatedAt = orderEntity.updatedAt;
    model.productOrders = orderEntity.productsOrder.map(
      ProductOrderMapper.toModel,
    );

    if (orderEntity.user) {
      model.user = UserMapper.toModel(orderEntity.user);
    }
    return model;
  }
}
