import {
  CreateOrderEntity,
  CreateProductOrderEntity,
} from '@Domain/entities/create-order.entity';
import { OrderEntity } from '@Domain/entities/order.entity';
import { ProductOrderMapper } from '@Infrastructure/typeorm/mappers/product-order.mapper';
import { CreateOrderRequestDto } from '../dtos/request/create-order.request.dto';
import { OrderResponseDto } from '../dtos/response/order.response.dto';

export class OrderMapper {
  static toCreateOrderEntity(dto: CreateOrderRequestDto): CreateOrderEntity {
    const productOrders = dto.productOrders.map((productOrderDto) => {
      return new CreateProductOrderEntity(
        productOrderDto.productId,
        productOrderDto.quantity,
      );
    });

    return new CreateOrderEntity(productOrders, dto.cpf);
  }

  static toResponseDto(orderEntity: OrderEntity): OrderResponseDto {
    const productOrders = orderEntity.productsOrder?.map(
      ProductOrderMapper.toEntity,
    );

    return {
      id: orderEntity.id,
      totalPrice: orderEntity.totalPrice.getValue(),
      estimatedPreparationTime: orderEntity.estimatedPreparationTime,
      user: orderEntity.user,
      paymentStatus: orderEntity.paymentStatus,
      orderStatus: orderEntity.orderStatus,
      createdAt: orderEntity.createdAt,
      updatedAt: orderEntity.updatedAt,
      productOrders: productOrders,
      preparationTime: orderEntity.preparationTime,
    };
  }
}
