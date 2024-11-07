import {
  PaymentRequestDto,
  ProductItem,
} from '@Application/dtos/request/payment/payment.request.dto';
import { OrderEntity } from '@Domain/entities/order.entity';

export class PaymentMapper {
  static ToPaymentRequestDto(
    order: OrderEntity,
    notificationUrl: string,
  ): PaymentRequestDto {
    const payment = new PaymentRequestDto();
    payment.external_reference = order.id.toString();
    payment.title = `Pedido - ${order.id}`;
    payment.description = `Combo de lanches`;
    payment.notification_url = notificationUrl;
    payment.total_amount = order.totalPrice.getValue();

    payment.items = order.productsOrder.map((productOrder) => {
      const item = new ProductItem();
      item.description = productOrder.product.description;
      item.title = productOrder.product.name;
      item.quantity = 1;
      item.category = 'marketplace';
      item.unit_measure = 'unit';
      item.unit_price = Number(productOrder.product.price);
      item.total_amount = Number(productOrder.product.price);

      return item;
    });

    return payment;
  }
}
