import { OrderEntity } from '@Domain/entities/order.entity';
import { TotalPriceValueObject } from '@Domain/value-objects/total-price.value-objects';
import { OrderModel } from '../models/order.model';
import { ProductOrderMapper } from './product-order.mapper';
import { UserMapper } from './user.mapper';

export class OrderMapper {
  static toEntity(orderModel: OrderModel): OrderEntity {
    if (!orderModel) return null;

    return new OrderEntity(
      new TotalPriceValueObject(orderModel.totalPrice),
      orderModel.paymentStatus,
      orderModel.orderStatus,
      orderModel.createdAt,
      orderModel.estimatedPreparationTime,
      orderModel.productOrders?.map(ProductOrderMapper.toEntity),
      UserMapper.toEntity(orderModel.user),
      orderModel.id,
      orderModel.updatedAt,
      orderModel.preparationTime,
    );
  }

  static toModel(orderEntity: OrderEntity): OrderModel {
    if (!orderEntity) return null;

    const model = new OrderModel();
    model.id = orderEntity.id;
    model.totalPrice = orderEntity.totalPrice.getValue();
    model.paymentStatus = orderEntity.paymentStatus;
    model.orderStatus = orderEntity.orderStatus;
    model.estimatedPreparationTime = orderEntity.estimatedPreparationTime;
    model.createdAt = orderEntity.createdAt;
    model.updatedAt = orderEntity.updatedAt;
    model.productOrders = orderEntity.productsOrder?.map(
      ProductOrderMapper.toModel,
    );
    model.preparationTime = orderEntity.preparationTime;

    if (orderEntity.user) {
      model.user = UserMapper.toModel(orderEntity.user);
    }
    return model;
  }
}
