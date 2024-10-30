import { CreateCheckoutRequestDto } from '@Application/dtos/request/create-checkout.dto';
import {
  PaymentRequestDto,
  ProductItem,
} from '@Application/dtos/request/payment.request.dto';
import { PaymentResponseDto } from '@Application/dtos/response/payment.response';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import {
  IMercadoPagoService,
  IMercadoPagoServiceSymbol,
} from '@Infrastructure/services/mercadopago/mercadopago.service';
import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';

@Injectable()
export class CheckoutUseCase {
  constructor(
    @Inject(IMercadoPagoServiceSymbol)
    private readonly mercadoPagoService: IMercadoPagoService,
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  /* refatorar */

  async execute(dto: CreateCheckoutRequestDto): Promise<PaymentResponseDto> {
    const order = await this.orderService.findOrderById(dto.orderId);

    if (order) {
      throw Error('Ordem invalida');
    }

    const payment = new PaymentRequestDto();
    payment.external_reference = order.id;
    payment.title = 'teste';
    payment.description = 'teste';
    payment.notification_url =
      this.environmentVariableService.mercadoPagoConfig.notificationUrl;
    payment.total_amount = order.totalPrice.getValue();

    payment.items = order.productsOrder.map((productOrder) => {
      const item = new ProductItem();
      item.description = productOrder.product.description;
      item.quantity = 1;
      item.category = 'marketplace';
      item.unit_measure = 'unit';
      item.total_amount = productOrder.product.price;

      return item;
    });

    return await this.mercadoPagoService.createPayment(payment);
  }
}
