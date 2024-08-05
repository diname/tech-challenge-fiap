import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { OrderEntity } from '../../domain/entities/order.entity';
import { CreateOrderRequestDto } from '../dtos/request/create-order.request.dto';
import { OrderResponseDto } from '../dtos/response/order.respose.dto';

export class OrderMapper {
  static toEntity(dto: CreateOrderRequestDto): OrderEntity {
    //const productOrders = dto.productOrders.map(ProductOrderMapper.toEntity);

    return new OrderEntity(
      0,
      dto.totalPrice,
      PaymentStatusType.PENDING,
      OrderStatusType.NONE,
      new Date(),
      new Date(),
      [],
      //productOrders,
    );
  }

  static toResponseDto(entity: OrderEntity): OrderResponseDto {
    const orderResponseDto = new OrderResponseDto();
    orderResponseDto.id = entity.id;
    orderResponseDto.totalPrice = entity.totalPrice;
    orderResponseDto.paymentStatus = entity.paymentStatus;
    orderResponseDto.orderStatus = entity.orderStatus;
    orderResponseDto.createdAt = entity.createdAt;
    orderResponseDto.updatedAt = entity.updatedAt;
    orderResponseDto.productOrders = entity.productOrders;
    return orderResponseDto;
  }
}
